const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = require("../models/users");
const movies = require("../models/movies");

const moviesToWatchList = new Schema({
    user: {
        type: Schema.ObjectId, 
        ref: users,
        required: true
    },
    moviesList: [{
        type: Schema.ObjectId, 
        ref: movies,
        required: true
    }]
});

module.exports = mongoose.model("MoviesToWatchList", moviesToWatchList);