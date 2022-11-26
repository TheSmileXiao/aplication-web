const express = require('express');
const router = express.Router();
const User = require('../models/users');

//por ID concreto
router.route('/:user_id')
  .get(async function (req, res) {
    const user = await User.findOne({ user: req.params.user_id });
    console.log(user);
    res.status(200).send(user);
  })
  .put(function (req, res) {
    //Update data
    res.send('OK');
  })
  .delete(function (req, res) {
    //delete user
  })
  router.get("/type/:user", async function(req,res){
    try {
        const aux = await User.findOne({ user: req.params.user });
        res.status(200).json({type:aux.type});
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;