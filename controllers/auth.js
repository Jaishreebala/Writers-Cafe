const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

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