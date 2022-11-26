const express = require("express");
const router = express.Router();
const Note = require('../models/Note');
const User = require('../models/User');

router.get("/:user/notes", async function(req, res){
    const user = await User.findOne({user: req.params.user}).exec();
    if(user !== null){
        const userID = user._id;
        const notes = await Note.find({usuario: userID});
        res.status(200);
        res.json(notes);
        res.end();
    }else{
        res.status(400);
        res.end();
    }


})
router.post("/:user/notes", async function(req, res){
    const user = await User.findOne({user: req.params.user}).exec();
    if(user !== null){
        const userID = user._id;
        //console.log(userID);
        const {title, content} = req.body;
        const newNote = new Note({
            title: title,
            content: content,
            usuario: userID
        })
        await newNote.save(function(err, result){
            if(err) {
              response = {"error" : true,"message" : "Error adding data"};
            } 
            else {
                response = {"error" : false,"message" : "Data added", _id:result._id};
            }
            res.json(response);
        });
    }else{
        res.status(400);
        res.end();
    }

    /*const userName = req.params.user;
    for(let user of users){
        if(user.userName === userName){
            user.notas.push(req.body);
            res.send(user.notas);
        }
    }
    res.status(400);//
    res.end();
    return;
    */
})

router.put("/:user/notes/:note", async function(req, res){  
    const user = await User.findOne({user: req.params.user}).exec();
    if(user !== null){
        const userID = user._id;
        const noteID = req.params.note;
        const {title, content} = req.body;

        const note = await Note.findOneAndUpdate({_id: noteID, usuario: userID}, {title: title, content: content}).exec();
        if(note !== null){
            console.log(note);
            res.status(200);
            res.json({message: 'Note Updated'})
            res.end();
        }
    }

    res.status(400);
    res.end();
    return;
})

/*router.delete("/:user/notes/:note", async function(req, res){
    const user = await User.findOne({user: req.params.user});
    const userID = user._id;
    const noteID = req.params.note;
    await Note.findOneAndDelete({_id: noteID, usuario: userID}, function(req, res){

        console.log("Delete OK" + res);
        res.status(200);
        res.json({message: 'Note Deleted'})
        res.end();
    })
    res.status(400);
    res.end();
})
*/
router.delete("/:user/notes/:note", async function(req, res){  
    const user = await User.findOne({user: req.params.user}).exec();
    const userID = user._id;
    const noteID = req.params.note;

    await Note.findOneAndDelete({_id: noteID, usuario: userID}).exec()
    res.status(200);
    res.json({message: 'Note Deleted'})
})



module.exports = router;