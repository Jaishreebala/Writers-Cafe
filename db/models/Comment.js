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

CommentSchema.statics.getAverageRating = async function (writtenWorkId) {
    const avgPipeline = await this.aggregate([
        { $match: { writtenWork: writtenWorkId } },
        {
            $group: {
                _id: '$writtenWork',
                averageRating: { $avg: '$rating' }
            }
        }
    ])

    try {
        await this.model('Writtenwork').findByIdAndUpdate(writtenWorkId, {
            averageRating: Math.round(avgPipeline[0].averageRating * 10) / 10
        })
    } catch (err) {
        console.log(err);
    }
    console.log(avgPipeline);
}

CommentSchema.post('save', function () {
    this.constructor.getAverageRating(this.writtenWork);
})


module.exports = mongoose.model('Comment', CommentSchema);