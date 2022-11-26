const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = require("../models/users");
const Movies = require("../models/movies");

const favMoviesList = new Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: Users,
        required: true
    },
    moviesList: [{
        type: mongoose.Types.ObjectId, 
        ref: Movies,
        required: true
    }]
});

module.exports = mongoose.model("FavMoviesList", favMoviesList);