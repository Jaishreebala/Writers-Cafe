const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");
const sendMail = require('../utils/sendmail');
const crypto = require("crypto");


// @desc    Register New User
// @route   POST | api/v1/auth/register
// @access  public

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, address } = req.body;
    let user = await User.create({ firstName, lastName, email, password, address });
    sendTokenResponse(user, 200, res);
})

// @desc    Login New User
// @route   POST | api/v1/auth/login
// @access  public

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorResponse(`Please enter an email and password`, 400))
    }

    let user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new errorResponse(`Invalid Credentials`, 401))
    }
    let passwordMatch = await user.comparePasswords(password)
    if (!passwordMatch) {
        return next(new errorResponse(`Invalid Credentials`, 401))
    }
    sendTokenResponse(user, 200, res);
})

// @desc: Log user out
// @route: GET /api/v1/auth/logout
// @access: Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({ success: true, data: {} })
})


// @desc    Profile page of logged in user
// @route   GET | api/v1/auth/me
// @access  private

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({ path: 'writtenworks', select: 'name genre photo view description workType averageRating' });
    res.status(200).json({ success: true, data: user })
})

// @desc    Update details of logged in user
// @route   PUT | api/v1/auth/me
// @access  private

exports.updateMe = asyncHandler(async (req, res, next) => {
    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
        return next(new errorResponse(`Invalid Token`, 400));
    }
    if (req.body.firstName) {
        user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        user.lastName = req.body.lastName;
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    if (req.body.address) {
        user.address = req.body.address;
    }

    await user.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, data: user })
})

// @desc    Update profile picture of logged in user
// @route   PUT | api/v1/auth/photoUpload
// @access  private

exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
    if (!req.files) {
        return next(new errorResponse(`Please upload a file`))
    }
    if (!req.files.file.mimetype.startsWith("image")) {
        return next(new errorResponse(`Please upload an image file`), 400)
    }
    if (req.files.file.size > process.env.FILE_MAX_UPLOAD) {
        return next(new errorResponse(`File size should be less than ${process.env.FILE_MAX_UPLOAD / 1000}KB`), 400)
    }
    req.files.file.name = `Photo_${req.user.id}${path.parse(req.files.file.name).ext}`;
    req.files.file.mv(`.${process.env.FILE_UPLOAD_PATH}/users/${req.files.file.name}`, async err => {
        if (err) {
            console.log(err);
            return next(new errorResponse(`Problem with file upload, try again`), 500)
        }
        await User.findByIdAndUpdate(req.user.id, { photo: req.files.file.name });
        res.status(200).json({ success: true, data: req.files.file.name })
    })
})

// @desc    Forgot Password
// @route   POST | api/v1/auth/forgotPassword
// @access  public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new errorResponse(`User Does Not Exist`, 404));
    }
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;
    const resetURL = `http://localhost:3000/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Below is the link for resetting the password to your Writer's Cafe account. \n\n${resetURL}`;

    try {
        await sendMail({
            email: user.email,
            subject: 'Password Reset Token',
            message
        })
    }
    catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new errorResponse('Email could not be sent', 500))
    }
    res.status(200).json({ success: true, resetToken })

})

// @desc: Reset Password
// @route: PUT /api/v1/auth/me
// @access: Private
exports.resetUserPassword = asyncHandler(async (req, res, next) => {
    // Get hashed token
    const resetTokenPassword = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    const user = await User.findOne({
        resetPasswordToken: resetTokenPassword,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        return next(new errorResponse(`Invalid Token`, 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    sendTokenResponse(user, 200, res);
})


const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getJWTWebToken();
    let options = {
        expires: new Date(Date.now() + process.env.COOKIE_TOKEN_LIFE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    // if (process.env.NODE_ENV === 'production') {
    //     options.secure = true
    // }
    // console.log()
    res.status(statusCode).cookie('token', token, options).json({ success: true, token })
}