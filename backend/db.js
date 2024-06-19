const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String, required: true },
    status: { type: Boolean, required: true }
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    todos: {
        type: [todoSchema],
        required: false,
    },
});

const USER = mongoose.model('USER', userSchema);

module.exports = {
    USER,
}