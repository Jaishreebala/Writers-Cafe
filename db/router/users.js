const express = require('express');
const { getAllUsers, getUsersWithinRadius } = require('../controllers/users');
const { protect } = require("../middleware/auth");
const router = express.Router();
const advancedResults = require("../middleware/advancedResults");
const User = require("../models/User");

router
    .route("/")
    .get(advancedResults(User, { path: 'writtenworks', select: 'name genre photo', match: { view: 'public' } }), getAllUsers);
router.route("/radius/:zipcode/:distance")
    .get(protect, getUsersWithinRadius)
module.exports = router;