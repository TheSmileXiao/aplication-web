const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');
const FavMoviesList = require('../models/favMoviesList');
const Movie = require('../models/movies');

router.get("/:user",async function(req,res){
    try {
        const aux = await User.findOne({ 'user': req.params.user });
        const list = await FavMoviesList.findOne({ 'user': aux });
        if(list == null) {
            res.status(200).json([]);
        }else {
            const movieList = list.moviesList;
            const movies = await Movie.find({ '_id': { $in: movieList }}).select('title imageLink');
            res.status(200).json(movies);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/:user", async function(req,res){
    try {
        const userAux = await User.findOne({ user: req.params.user });
        const listaAux = await FavMoviesList.findOne({ user: userAux });
        if(listaAux == null) {
            const list = new FavMoviesList({
                user: userAux._id,
                moviesList: [req.body.movieId],
            });
            await list.save();
            res.status(200).send(list);
        }else {
            if(!listaAux.moviesList.includes(req.body.movieId)) {
                listaAux.moviesList.push(req.body.movieId);
                await listaAux.save();  
            }
            res.status(200).send(listaAux);
        }
    } catch (error) {
        res.send(error);
    }
});

router.put("/:user", async function(req,res){
    try {
        const userAux = await User.findOne({ user: req.params.user });
        await FavMoviesList.updateOne({ user: userAux }, {
            $pull: {
                moviesList: req.body.movieId,
            },
        });
        res.status(200).end();
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;