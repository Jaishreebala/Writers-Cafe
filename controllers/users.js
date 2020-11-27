const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");
const geocoder = require("../utils/geocoder");


// @desc    Get All Written Works
// @route   GET | api/v1/users
// @access  public

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})


// @desc: Get users within radius
// @route: /api/v1/users/radius/:zipcode/:distance
// @access: Private
exports.getUsersWithinRadius = asyncHandler(async (req, res, next) => {
    let { zipcode, distance } = req.params;

    // Get lat & long from gc
    let loc = await geocoder.geocode(zipcode)
    let lat = loc[0].latitude;
    let lng = loc[0].longitude;

    // Calc radians 
    // Earth rad 6378 km
    const radius = distance / 3963;
    const users = await User.find({
        location: {
            $geoWithin: { $centerSphere: [[lng, lat], radius] }
        }
    })

    res.status(200).json({ success: true, count: users.length, data: { users } })
})