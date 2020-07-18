const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true

    },

    easyToMake: {
        type: Number,

    },
    quickToMake: {
        type: Number,

    },
    taste: {
        type: Number,

    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating:{
        type:Boolean,
        default: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;