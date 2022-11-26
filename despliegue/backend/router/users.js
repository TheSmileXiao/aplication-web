const express = require("express");
const router = express.Router();
const User = require('../models/User');


router.get("/", async function(req, res){
    const users = await User.find().exec();
    if(users !== null){
        res.json(users);
        res.status(200);
        res.end();
    }else{
        res.status(400);
        res.end();
    }
})

module.exports = router;