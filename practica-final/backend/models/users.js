const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    type:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Users", user);