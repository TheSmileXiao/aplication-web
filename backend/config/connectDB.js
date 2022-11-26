const mongoose = require('mongoose');
const config = require('config');
const URI = process.env.MONGODB_URI || config.get("MONGODB_URI");

//console.log(config.get("MONGODB_URI"));
mongoose.connect(URI,{
    useNewUrlParser: true
});

const connectDB = mongoose.connection;

connectDB.once('open',()=>{
    console.log('DB is connected');
});

/*const connectDB = async () =>{
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
        });
        console.log("MongoDB connected");
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};
*/
module.exports = connectDB;