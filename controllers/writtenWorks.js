const Writtenwork = require("../models/Writtenwork");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");


// @desc    Get All Written Works
// @route   GET | api/v1/writtenWorks
// @access  public

exports.getAllWrittenWorks = asyncHandler(async (req, res, next) => {
    let query;
    let reqQuery = { ...req.query };
    let removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(field => {
        delete reqQuery[field];
    });
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|lt|gte|lte|in)\b/g, match => `$${match}`);
    query = Writtenwork.find(JSON.parse(queryStr));
    if (req.query.select) {
        let fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    if (req.query.sort) {
        let fields = req.query.sort.split(',').join(' ');
        query = query.sort(fields);
    } else {
        query = query.sort('-createdAt');
    }
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 3;
    let totalResults = await Writtenwork.countDocuments();
    let pagination = {};
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    if (endIndex < totalResults) {
        pagination.next = page + 1;
    }
    if (startIndex > 0) {
        pagination.prev = page - 1;
    }
    query = query.skip(startIndex).limit(limit);
    const writtenWorks = await query;

    res.status(200).json({ success: true, pagination, count: writtenWorks.length, data: writtenWorks });
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