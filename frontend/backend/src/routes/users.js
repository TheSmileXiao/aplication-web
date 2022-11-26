const express = require("express");
const router = express.Router();

var data = require("../data");
var users = data.users;
var usuarios = []
for(let user of users){
    var usuario={}
    usuario.userName = user.userName;
    usuario.passWord = user.password;
    usuarios.push(usuario);
}

router.get("/", function(req, res){
    res.send(usuarios);
    return;
})
module.exports = router;