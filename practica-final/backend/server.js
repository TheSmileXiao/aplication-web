var express = require("express");
const cors = require("cors");
const { stderr } = require("process");
const connectDB = require("./config/connectDB");

connectDB();

var app = express();
var users = require('./routes/users');
var login = require('./routes/login');
var movies = require("./routes/movies");
var signup = require("./routes/signup");
var reviews = require("./routes/reviews");
var favMoviesList = require("./routes/favMoviesList"); 
var moviesToWatch = require("./routes/moviesToWatch");
var mostRated = require("./routes/mostRated");




//middleware
app.use(express.json());
app.use(cors());


app.use("/api/signup", signup);
app.use("/api/login", login);
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/reviews", reviews);
app.use("/api/favMoviesList", favMoviesList);
app.use("/api/moviesToWatch", moviesToWatch);
app.use("/api/MostRated",mostRated);



if(process.env.NODE_ENV === "production") {
    app.use(express.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor con puerto ${PORT}`));