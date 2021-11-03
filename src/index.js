const express = require("express");
const router = require("./route");
const mongoose = require("mongoose");
const app = express();
const uri = "mongodb+srv://daryoh:teslim3296@cluster0.mztzf.mongodb.net/todo_app?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const PORT = 3000;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`DataBase connected`);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch((err) => {
        console.log(err);
    });