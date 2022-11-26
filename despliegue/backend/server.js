const express = require('express');
const cors = require('cors');
const connectDB = require("./config/connectDB");

const app = express();
const port = process.env.PORT || 5000;

async function main() {
    connectDB();
    await app.listen(port);
    console.log('servidor a su servicio en el puerto', port)
}



//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/login", require("./router/login"));
app.use("/api/users", require("./router/users"));
app.use("/api", require("./router/notes"));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}


main();


