const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    postId: {
        type: String,
    }
});

module.exports = mongoose.model("Blog-comments", CommentsSchema)