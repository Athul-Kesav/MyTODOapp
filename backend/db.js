const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    hashPass: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    todos: {
        type: [
            {
                title: String,
                description: String,
                deadline: Date,
                status: Boolean,
            },
        ],
        required: false,
    },
});

const USER = mongoose.model('USER', userSchema);

module.exports = {
    USER,
}