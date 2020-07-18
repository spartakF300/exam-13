const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    image: {
        type: String,

    },
    easyToMake: {
        type: Number,
        default: 0.0
    },
    quickToMake: {
        type: Number,
        default: 0.0
    },
    taste: {
        type: Number,
        default: 0.0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    overall: {
        type: Number,
        default: 0.0
    },
    images: [String]
});

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;