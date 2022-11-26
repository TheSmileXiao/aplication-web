const express = require('express');
const cors = require('cors');
const connectDB = require("./config/connectDB");

const app = express();
const port = process.env.PORT || 5000;

async function main() {
    await app.listen(port);
    console.log('servidor a su servicio en el puerto', port)
}

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/login", require("./router/login"));
app.use("/users", require("./router/users"));
app.use("/", require("./router/notes"));

main();


