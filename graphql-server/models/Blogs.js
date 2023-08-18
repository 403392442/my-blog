const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    title: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        }
    ],
    commentsAmount: Number,
})

module.exports = mongoose.model("Blogs", BlogsSchema)