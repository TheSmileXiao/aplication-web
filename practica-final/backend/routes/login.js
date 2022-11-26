const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/", async function(req, res) {
    var auxUser = await User.findOne({ user: req.body.username }).exec();
    if(auxUser == null) {
        res.status(400);
        res.send('La cuenta no puede estar vacía.')
        res.end();
    }else {
        const match = await bcrypt.compare(req.body.password, auxUser.password);

        if(match) {
            res.status(200).end();
        }else {
            res.status(400).end();
        }
    }
});

module.exports = router;