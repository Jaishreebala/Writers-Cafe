const Writtenwork = require("../models/Writtenwork");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");


// @desc    Get All Written Works
// @route   GET | api/v1/writtenWorks
// @access  public

exports.getAllWrittenWorks = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// @desc    Get Written Work By ID
// @route   GET | api/v1/writtenWorks/:id
// @access  public

exports.getWrittenWorkById = asyncHandler(async (req, res, next) => {
    const writtenWork = await Writtenwork.findById(req.params.id).populate({ path: 'author', select: 'firstName lastName' }).populate({ path: 'comments', select: 'comment' });
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
    await writtenWork.remove();

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
    req.files.file.mv(`.${process.env.FILE_UPLOAD_PATH}/writtenWorks/${req.files.file.name}`, async err => {
        if (err) {
            console.log(err);
            return next(new errorResponse(`Problem with file upload, try again`), 500)
        }
        await Writtenwork.findByIdAndUpdate(req.params.id, { photo: req.files.file.name });
        res.status(200).json({ success: true, data: req.files.file.name })
    })
})