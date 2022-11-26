const express = require('express');
const app = express();

const port = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", require("./router/login"));
app.use("/users", require("./router/users"));
app.use("/", require("./router/notes"));



app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})