const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', 5000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/login", require("./routes/login"));
app.use("/users", require("./routes/users"));
app.use("/", require("./routes/notes"));

module.exports = app;