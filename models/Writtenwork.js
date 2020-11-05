const mongoose = require("mongoose");

const WrittenworkScema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please give your new written work a name'],
        trim: true,
        maxlength: [50, 'Name has a limit of 50 characters maximum'],
        unique: [true, "Name already exists"]
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a short relevant description'],
        maxlength: [500, 'Description has a limit of 500 characters']
    },
    workType: {
        type: String,
        required: true,
        enum: ['Poetry', 'Short Story', 'Novel', 'Journal/Diary', 'Quotes']
    },
    genre: {
        type: String,
        required: true,
        enum: ['Fantasy', 'Adventure', 'Romance', 'Contemporary', 'Dystopian', 'Mystery', 'Horror', 'Thriller', 'Paranormal', 'Historical fiction', 'Science Fiction', 'Memoir', 'Cooking', 'Art', 'Self-help / Personal', 'Development', 'Motivational', 'Health', 'History', 'Travel', 'Guide / How-to', 'Families & Relationships', 'Humor', 'Children’s', 'Other']
    },
    view: {
        type: String,
        required: true,
        enum: ['private', 'public']
    },
    photo: {
        type: String,
        default: 'placeholder-story.svg'
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
    },
    nsfwContent: {
        type: Boolean,
        default: false
    },
    violence: {
        type: Boolean,
        default: false
    },
    suicideOrTriggerWarning: {
        type: Boolean,
        default: false
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WrittenWork', WrittenworkScema);