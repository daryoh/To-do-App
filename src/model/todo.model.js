const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

// schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });

const Todo = mongoose.model("todos", schema);
module.exports = Todo;