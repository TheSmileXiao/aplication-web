const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post("/", async function(req, res) {
    var user = await User.findOne({ user: req.query.user }).exec();
    if(user == null) {
        res.status(400);
        res.end();
    }else if(user.password === req.query.password) {
        res.status(200);
        res.send(user);
    }else {
        res.status(400);
        res.end();
    }
});

module.exports = router;