const Comment = require("../models/Comment");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");


// @desc    Get Comments 
// @route   GET | api/v1/comments or api/v1/:writtenworkId/comments
// @access  private

exports.getAllComments = asyncHandler(async (req, res, next) => {
    let comments;
    if (req.params.writtenworkId) {
        comments = await Comment.find({ writtenWork: req.params.writtenworkId });
    }
    else {
        comments = await Comment.find();
    }
    res.status(200).json({ success: true, data: comments });
})

// @desc    Add Comments 
// @route   POST | api/v1/writtenWork/:writtenworkId/comments
// @access  private

exports.addComment = asyncHandler(async (req, res, next) => {
    req.body.writtenWork = req.params.writtenworkId;
    req.body.user = req.user.id;
    const comment = await Comment.create(req.body);
    res.status(201).json({ success: true, data: comment });
})

// @desc    Edit Comments 
// @route   PUT | api/v1/:writtenworkId/comments/:id
// @access  private

exports.updateComment = asyncHandler(async (req, res, next) => {
    let comment = await Comment.findById(req.params.id)
    if (req.user.id != comment.user) {
        return next(new errorResponse(`User ${req.user.id} does not have permission to edit this comment.`, 400));
    }
    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    });
    res.status(201).json({ success: true, data: comment });
})