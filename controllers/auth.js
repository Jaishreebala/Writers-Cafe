const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");

// @desc    Register New User
// @route   POST | api/v1/auth/register
// @access  public

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    let user = await User.create({ firstName, lastName, email, password });
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

// @desc    Profile page of logged in user
// @route   GET | api/v1/auth/me
// @access  private

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user })
})

// @desc    Update details of logged in user
// @route   PUT | api/v1/auth/me
// @access  private

exports.updateMe = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email };
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true, runValidators: true
    });
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
    res.status(200).json({ success: true, resetToken })

})


const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getJWTWebToken();
    let options = {
        expires: new Date(Date.now() + process.env.COOKIE_TOKEN_LIFE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, token })
}