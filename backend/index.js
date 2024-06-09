const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { createTODO } = require('./types');
const { updateTODO } = require('./types');
const mongoose = require('mongoose');
const PORT = 3001;
const { mdbURL } = require('./pass');

mongoose.connect(mdbURL);


const todoSchema = new mongoose.Schema({
    username: String,
    id: String,
    title: String,
    description: String,
    status: String,
});

const TODO = mongoose.model('TODO', todoSchema);


app.use(express.json());

app.post('/todo', async function (req, res){
    const payLoad = req.body;
    const parsedPayload = createTODO.safeParse(payLoad);

    if(!parsedPayload.success){
        return res.status(400).json(parsedPayload.error);
    } else {
        const todo = new TODO({
            username: parsedPayload.data.username,
            id: parsedPayload.data.id,
            title: parsedPayload.data.title,
            description: parsedPayload.data.description,
            status: parsedPayload.data.status,
        });

        await todo.save();
        return res.status(200).json({message: 'TODO created successfully'});
    }
})

app.get('/todos', async (req, res) => {
    const todos = await TODO.find({})
    if(!todos){
        return res.status(500).json({message: 'Internal server error'});
    } else {
        return res.status(200).json(todos);
    }
})

app.put('/completed', async function (req, res){
    const payLoad = req.body;
    const parsedPayload = updateTODO.safeParse(payLoad);
    const todo = await TODO.findOne({id: parsedPayload.data.id});
    todo.status = parsedPayload.data.status;
    await todo.save();
    return res.status(200).json({message: 'TODO updated successfully'});
})

app.listen(PORT, function (){
    console.log(`Server started on port ${PORT}`);
})

