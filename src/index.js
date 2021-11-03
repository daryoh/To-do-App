const express = require("express");
const router = require('./route')
const app = express();

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://daryoh:teslim3296@cluster0.mztzf.mongodb.net/todo_app?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

client.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`DataBase connected`);
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    }

});