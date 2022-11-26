var mongoose = require('mongoose');
var config = require('config');
const db = process.env.MONGODB_URI || config.get("MONGODB_URI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        console.log("MongoDB connected");
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

module.exports = connectDB;