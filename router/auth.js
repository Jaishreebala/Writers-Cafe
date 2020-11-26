const express = require('express');
const { registerUser, loginUser, getMe, updateMe, userPhotoUpload, forgotPassword } = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const router = express.Router();


router
    .route("/register")
    .post(registerUser);

router
    .route("/login")
    .post(loginUser);

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


module.exports = router;