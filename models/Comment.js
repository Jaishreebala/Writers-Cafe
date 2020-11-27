const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    comment: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    writtenWork: {
        type: mongoose.Schema.ObjectId,
        ref: 'Writtenwork',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});



module.exports = mongoose.model('Comment', CommentSchema);