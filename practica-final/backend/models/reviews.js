const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const review = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    cont: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    rates: [{
        rate:{
            type: Number
        },
        user:{
            type: Schema.ObjectId,
            unique: true
        }
    }],
    reviewRate: {
        type: Number,
        default: 0,
    }

});

module.exports = mongoose.model("Reviews", review);