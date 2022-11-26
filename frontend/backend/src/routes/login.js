const express = require("express");
const router = express.Router();

var data = require("../data");
var users = data.users;

router.post("/", function (req, res){
    for(let user of users){
        if(user.userName === req.query.userName && user.password === req.query.password){
            res.send("Autenticacion correcto<br>userName: " + user.userName+"<br>password: " + user.password);
        }
    }
    res.status(400);//
    res.end();
    return;
});

module.exports = router;