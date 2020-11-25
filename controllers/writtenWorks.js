const Writtenwork = require("../models/Writtenwork");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");


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
    queryStr = JSON.parse(queryStr);
    queryStr.view = 'public';
    // public
    query = Writtenwork.find(queryStr);
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
    req.body.author = req.user.id;
    const writtenWork = await Writtenwork.create(req.body);
    res.status(200).json({ success: true, data: writtenWork });
});

// @desc    Update Written Work By ID
// @route   PUT | api/v1/writtenWorks/:id
// @access  private

exports.updateWrittenWorkById = asyncHandler(async (req, res, next) => {
    let writtenWork = await Writtenwork.findById(req.params.id);
    if (!writtenWork)
        return next(new errorResponse(`Written work not found with the ID of ${req.params.id}`, 400));
    if (req.user.id != writtenWork.author.toString()) {
        return next(new errorResponse(`User ${req.user.id} does not have permission to edit this work.`, 401));
    }
    writtenWork = await Writtenwork.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    });
    res.status(200).json({ success: true, data: writtenWork });
});


// @desc    Delete Written Work By ID
// @route   DELETE | api/v1/writtenWorks/:id
// @access  public

exports.deleteWrittenWorkById = asyncHandler(async (req, res, next) => {
    let writtenWork = await Writtenwork.findById(req.params.id);
    if (!writtenWork)
        return next(new errorResponse(`Written work not found with the ID of ${req.params.id}`, 400));
    if (req.user.id != writtenWork.author.toString()) {
        return next(new errorResponse(`User ${req.user.id} does not have permission to edit this work.`, 401));
    }
    await Writtenwork.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
});

// @desc    Upload/Update cover page/photo of a Written Work 
// @route   PUT | api/v1/writtenWorks/:id
// @access  private

exports.uploadPhotoForWrittenWork = asyncHandler(async (req, res, next) => {
    const writtenWork = await Writtenwork.findById(req.params.id);
    if (!writtenWork) {
        return next(new errorResponse(`Written work not found with the ID of ${req.params.id}`, 400));
    }
    if (req.user.id != writtenWork.author.toString()) {
        return next(new errorResponse(`User ${req.user.id} does not have permission to edit this work.`, 401));
    }
    if (!req.files) {
        return next(new errorResponse(`Please upload a file`))
    }
    if (!req.files.file.mimetype.startsWith("image")) {
        return next(new errorResponse(`Please upload an image file`), 400)
    }
    if (req.files.file.size > process.env.FILE_MAX_UPLOAD) {
        return next(new errorResponse(`File size should be less than ${process.env.FILE_MAX_UPLOAD / 1000}KB`), 400)
    }
    req.files.file.name = `Photo_${req.params.id}${path.parse(req.files.file.name).ext}`;
    req.files.file.mv(`.${process.env.FILE_UPLOAD_PATH}/${req.files.file.name}`, async err => {
        if (err) {
            console.log(err);
            return next(new errorResponse(`Problem with file upload, try again`), 500)
        }
        await Writtenwork.findByIdAndUpdate(req.params.id, { photo: req.files.file.name });
        res.status(200).json({ success: true, data: req.files.file.name })
    })
})