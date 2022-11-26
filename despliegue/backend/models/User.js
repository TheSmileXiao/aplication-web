const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);