const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: Boolean,
});

const TODO = mongoose.model('TODO', todoSchema);

module.exports = {
    TODO
}