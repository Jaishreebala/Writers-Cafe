const mongoose = require("mongoose");
const slugify = require("slugify");
const WrittenworkScema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please give your new written work a name.'],
        trim: true,
        unique: false,
        maxlength: [50, 'Name has a limit of 50 characters maximum.'],
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a short relevant description.'],
        maxlength: [500, 'Description has a limit of 500 characters']
    },
    workType: {
        type: String,
        required: [true, "Please choose what type of work you're creating."],
        enum: ['Poetry', 'Short Story', 'Novel', 'Journal/Diary', 'Quotes']
    },
    genre: {
        type: [String],
        required: [true, 'Please choose the genre of your work.'],
        enum: ['Fantasy', 'Adventure', 'Romance', 'Contemporary', 'Dystopian', 'Mystery', 'Horror', 'Thriller', 'Paranormal', 'Historical fiction', 'Science Fiction', 'Self-help / Personal', 'Motivational', 'Guide / How-to', 'Humor', 'Children’s', 'Other']
    },
    view: {
        type: String,
        required: [true, 'Please choose whether your work is public or private.'],
        enum: ['private', 'public']
    },
    photo: {
        type: String,
        default: 'placeholder-story.svg'
    },
    averageRating: {
        type: Number
    },
    nsfwContent: {
        type: Boolean,
        required: [true, 'Please state whether your work contains NSFW content or not.']
    },
    violence: {
        type: Boolean,
        required: [true, 'Please state whether your work contains violent content or not.']
    },
    suicideOrTriggerWarning: {
        type: Boolean,
        required: [true, 'Please state whether your work contains suicide and triggering content or not.']
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Reverse Populate With Virtuals
WrittenworkScema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'writtenWork',
    justOne: false
})


// Cascade Delete Comments When the written work is deleted
WrittenworkScema.pre('remove', async function (next) {
    console.log(`Comments being deleted from ${this.name}`);
    await this.model('Comment').deleteMany({ writtenWork: this._id });
    next();
})

// Convert Name to slug
WrittenworkScema.pre("save", function (next) {
    this.slug = slugify(this.name, {
        lower: true
    })
    next();
})

module.exports = mongoose.model('Writtenwork', WrittenworkScema);