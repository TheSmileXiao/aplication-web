const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/movies');

router.get("/:user",async function(req,res){
    try {
        const movies = await Movie.find().sort({rateTotal:-1}).limit(12).select('title imageLink');
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;