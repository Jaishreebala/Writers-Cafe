const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");


// @desc    Get All Written Works
// @route   GET | api/v1/users
// @access  public

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})