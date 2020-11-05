const Writtenwork = require("../models/Writtenwork");
const errorResponse = require("../utils/errorResponse");
// @desc    Get All Written Works
// @route   GET | api/v1/writtenWorks
// @access  public

exports.getAllWrittenWorks = async (req, res, next) => {
    try {
        const writtenWorks = await Writtenwork.find();
        res.status(200).json({ success: true, count: writtenWorks.length, data: writtenWorks });
    }
    catch (err) {
        next(err);
    }
}

// @desc    Get Written Work By ID
// @route   GET | api/v1/writtenWorks/:id
// @access  public

exports.getWrittenWorkById = async (req, res, next) => {
    try {
        const writtenWork = await Writtenwork.findById(req.params.id);
        if (!writtenWork) {
            return next(new errorResponse(`Written work not found with the ID of ${req.params.id}`, 400));
        }
        res.status(200).json({ success: true, data: writtenWork });
    }
    catch (err) {
        next(err);

    }
}

// @desc    Create New Written Work
// @route   POST | api/v1/writtenWorks
// @access  private

exports.createNewWrittenWork = async (req, res, next) => {
    try {
        console.log(req.body);
        const writtenWork = await Writtenwork.create(req.body);
        res.status(200).json({ success: true, data: writtenWork });
    }
    catch (err) {
        next(err);
    }
}

// @desc    Update Written Work By ID
// @route   PUT | api/v1/writtenWorks/:id
// @access  private

exports.updateWrittenWorkById = async (req, res, next) => {
    try {
        const writtenWork = await Writtenwork.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });
        if (!writtenWork)
            return next(new errorResponse(`Written work not found with the ID of ${req.params.id}`, 400));

        res.status(200).json({ success: true, data: writtenWork });
    }
    catch (err) {
        next(err);
    }
}

// @desc    Delete Written Work By ID
// @route   DELETE | api/v1/writtenWorks/:id
// @access  public

exports.deleteWrittenWorkById = async (req, res, next) => {
    try {
        const writtenWork = await Writtenwork.findByIdAndDelete(req.params.id);
        if (!writtenWork)
            return next(new errorResponse(`Written work not found with the ID of ${req.params.id}`, 400));
        res.status(200).json({ success: true, data: {} });
    }
    catch (err) {
        next(err);
    }
}