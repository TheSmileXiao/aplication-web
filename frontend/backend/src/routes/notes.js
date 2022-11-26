const express = require("express");
const router = express.Router();

var data = require("../data");
var users = data.users;

router.get("/:user/notes", function(req, res){
    const userName = req.params.user;
    for(let user of users){
        if(user.userName === userName){
            res.send(user.notas);
        }
    }
    res.status(400);//
    res.end();
    return;
})
router.post("/:user/notes", function(req, res){
    const userName = req.params.user;
    for(let user of users){
        if(user.userName === userName){
            user.notas.push(req.body);
            res.send(user.notas);
        }
    }
    res.status(400);//
    res.end();
    return;
})

router.put("/:user/notes/:note", function(req, res){  
    const userName = req.params.user;
    const id = parseInt(req.params.note);
    console.log(typeof(id));
    for(let user of users){
        if(user.userName === userName){
            for(let note of user.notas){
                console.log(1);
                if(note.id === id){
                    note.titulo = req.body.titulo;
                    note.contenido = req.body.contenido;
                    res.send(user.notas);
                }
            }
        }
    }
    res.status(400);//
    res.end();
    return;
})

router.delete("/:user/notes/:note", function(req, res){  
    const userName = req.params.user;
    const id = parseInt(req.params.note);
    console.log(typeof(id));
    for(let user of users){
        if(user.userName === userName){
            for(let i = 0; i < user.notas.length; i++){
                if(user.notas[i].id === id){
                    user.notas.splice(i,1);
                    res.send(user.notas);
                }
            }
        }
    }
    res.status(400);//
    res.end();
    return;
})


module.exports = router;