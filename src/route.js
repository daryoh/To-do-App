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

router.get("/todos/:id", (req, res) => {
    const id = req.params.id;

    Todo.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Todo with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Todo with id=" + id });
        });
})

router.patch("/todos/:id", (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`
                });
            } else res.send({ message: "Todo was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Todo with id=" + id
            });
        });
})

router.delete("/todos/:id", (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
                });
            } else {
                res.send({
                    message: "Todo was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Todo with id=" + id
            });
        });
})

module.exports = router;