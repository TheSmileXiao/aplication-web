const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');
const MoviesToWatch = require('../models/moviesToWatch');
const FavMoviesList = require('../models/favMoviesList');

router.post("/", async function(req, res) {
    try{
        var auxUser = await User.findOne({ user: req.body.username }).exec();
        if(auxUser == null) {
            auxUser = new User({
                user: req.body.username,
                password: req.body.password,
                email: req.body.email,
                type: req.body.type
            });
            auxUser.save();
    
            auxFavMovies = new FavMoviesList({
                user:auxUser,
                moviesList:[],
            });
           
            auxMoviesToWatch = new MoviesToWatch({
                user:auxUser,
                moviesList:[],
            });
           
            auxFavMovies.save();
            auxMoviesToWatch.save(); 
    
            return res.status(200).send(auxUser);
        }else {
            res.status(400);
            res.send('Username already exist.');
            res.end();
        }
    }catch (error) {
        res.status(500).send(error);
    }

});

module.exports = router;