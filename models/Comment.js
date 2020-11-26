const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: [true, "Please add some text description"]
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
CommentSchema.statics.getAverageRating = async function (bootcampId) {
    const obj = await this.aggregate([
        {
            $match: { writtenWork: Writtenwork }
        },
        {
            $group: {
                _id: '$writtenWork',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageRating: Math.ceil(obj[0].averageRating / 10) * 10
        })
    } catch (err) {
        console.error(err)
    }
}
// Call getavgcost after save
ReviewSchema.post("save", function () {
    this.constructor.getAverageRating(this.bootcamp);
});
// Call getavgcost before remove
ReviewSchema.pre("remove", function () {
    this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model('Review', ReviewSchema);