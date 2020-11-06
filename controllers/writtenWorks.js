const Writtenwork = require("../models/Writtenwork");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");


// @desc    Get All Written Works
// @route   GET | api/v1/writtenWorks
// @access  public

exports.getAllWrittenWorks = asyncHandler(async (req, res, next) => {
    let query;
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|lt|gte|lte|in)\b/g, match => `$${match}`);
    query = Writtenwork.find(JSON.parse(queryStr));
    const writtenWorks = await query;

    res.status(200).json({ success: true, count: writtenWorks.length, data: writtenWorks });
})

// @desc    Get Written Work By ID
// @route   GET | api/v1/writtenWorks/:id
// @access  public

exports.getWrittenWorkById = asyncHandler(async (req, res, next) => {
    const writtenWork = await Writtenwork.findById(req.params.id);
    if (!writtenWork) {
        return next(new errorResponse(`Written work not found with the ID of ${req.params.id}`, 400));
    }
    res.status(200).json({ success: true, data: writtenWork });
});

// @desc    Create New Written Work
// @route   POST | api/v1/writtenWorks
// @access  private

exports.createNewWrittenWork = asyncHandler(async (req, res, next) => {
    const writtenWork = await Writtenwork.create(req.body);
    res.status(200).json({ success: true, data: writtenWork });
});

// @desc    Update Written Work By ID
// @route   PUT | api/v1/writtenWorks/:id
// @access  private

exports.updateWrittenWorkById = asyncHandler(async (req, res, next) => {
    const writtenWork = await Writtenwork.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    });
    if (!writtenWork)
        return next(new errorResponse(`Written work not found with the ID of ${req.params.id}`, 400));

    res.status(200).json({ success: true, data: writtenWork });
});

// @desc    Delete Written Work By ID
// @route   DELETE | api/v1/writtenWorks/:id
// @access  public

exports.deleteWrittenWorkById = asyncHandler(async (req, res, next) => {
    const writtenWork = await Writtenwork.findByIdAndDelete(req.params.id);
    if (!writtenWork)
        return next(new errorResponse(`Written work not found with the ID of ${req.params.id}`, 400));
    res.status(200).json({ success: true, data: {} });
});