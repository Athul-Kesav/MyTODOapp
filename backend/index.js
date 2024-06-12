const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { signup, login, createTODO, updateTODO } = require('./types');
const mongoose = require('mongoose');
const PORT = 3001;
const { mdbURL } = require('./pass');
const { USER } = require('./db');
const cors = require('cors');

mongoose.connect(mdbURL);

app.use(cors())
app.use(express.json());

app.post('/signup', async function (req, res) {
    const payLoad = req.body;
    const parsedPayload = signup.safeParse(payLoad);
    if (!parsedPayload.success) {
        return res.status(400).json(parsedPayload.error);
    } else {
        const username = payLoad.username;
        const password = payLoad.password;
        const fullname = payLoad.fullname;
        const user = new USER({
            username: username,
            hashPass: password,
            fullname: fullname,
        });
        await user.save();
        return res.status(200).json({ message: 'User created successfully' });
    }
})

app.post('/createTodo', async function (req, res) {
    const payLoad = req.body;
    const parsedPayload = createTODO.safeParse(payLoad);

    if (!parsedPayload.success) {
        return res.status(400).json(parsedPayload.error);
    } else {
        const todo = new TODO({
            title: payLoad.title,
            description: payLoad.description,
            status: payLoad.status,
        });
        await todo.save();
        return res.status(200).json({ message: 'TODO created successfully' });
    }
})

app.get('/todos', async (req, res) => {
    const todos = await TODO.find({})

    if (!todos) {
        return res.status(500).json({ message: 'Internal server error' });
    } else {
        return res.status(200).json({ todos });
    }
})

app.post('/completed', async function (req, res) {
    const payLoad = req.body;
    const parsedPayload = updateTODO.safeParse(payLoad);
    if (!parsedPayload.success) {
        console.log('Something wrong with zod verification');
        return res.status(400).json(parsedPayload.error);
    }

    const todo = await TODO.findOne({ _id: payLoad.id });
    todo.status = payLoad.status;
    await todo.save();
    console.log("To-Do updated successfully");
    return res.status(200).json({ message: 'TODO updated successfully' });
})

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
})

