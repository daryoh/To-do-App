const express = require('express');
const Todo = require('./model/todo.model')

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

router.post("/todos", (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Title can not be empty!" });
        return;
    }

    if (!req.body.description) {
        res.status(400).send({ message: "Description can not be empty!" });
        return;
    }

    // Create a todo
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
    });

    // Save todo in the database
    todo.save().then(data => {
            res.status(201).json({
                message: "Welcome to your to-do app",
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the new todo."
            });
        });


});


router.get("/todos", (req, res) => {
    Todo.find()
        .then(data => {
            res.json({ data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });


});

module.exports = router;