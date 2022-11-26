const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movie = new Schema({
    title: {
        type: String,
        required: true,
    },
    sinopsis: {
        type: String,
        required: true,
    },
    imageLink:{
        type: String,
        required: true,
    },
    rates: [{
        rate:{
            type: Number,
        },
        user:{
            type: Schema.ObjectId
        }
    }],
    rateTotal: {
        type: Number,
        default: 0
    },
    info: {
        releaseDate: {
            type: Date,
        },
        characters: {
            type: String,
        },
        genre: {
            type: String,
            required: true,
        },
        prizes: {
            type: String,
        },
        trailer: {
            type: String,
        },
        producer: {
            type: String,
        },
        director: {
            type: String,
        },
    },
    duration: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Movies", movie);