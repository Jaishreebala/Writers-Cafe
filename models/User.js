const crypto = require("crypto");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Writtenwork = require("../models/Writtenwork");
const jwt = require('jsonwebtoken');
// const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter last name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true, 'Account already exists'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    photo: {
        type: String,
        default: 'placeholder-profile.svg'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Reverse Populate With Virtuals
UserSchema.virtual('writtenworks', {
    ref: 'Writtenwork',
    localField: '_id',
    foreignField: 'author',
    justOne: false
})



UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
// Obtain signed JSON web token
UserSchema.methods.getJWTWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: process.env.JWT_TOKEN_LIFE
    })
}

UserSchema.methods.comparePasswords = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}
UserSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('User', UserSchema);