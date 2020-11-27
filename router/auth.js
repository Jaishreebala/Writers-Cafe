const express = require('express');
const { registerUser, loginUser, getMe, updateMe, userPhotoUpload, resetUserPassword, forgotPassword, logout } = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const router = express.Router();


router
    .route("/register")
    .post(registerUser);

router
    .route("/login")
    .post(loginUser);

router
    .route("/logout")
    .get(logout);

router
    .route("/me")
    .get(protect, getMe)
    .put(protect, updateMe);

router
    .route("/photoUpload")
    .put(protect, userPhotoUpload);

router
    .route("/forgotPassword")
    .post(forgotPassword);

router
    .put('/resetpassword/:resetToken', resetUserPassword);


module.exports = router;