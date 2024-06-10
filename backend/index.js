const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { createTODO } = require('./types');
const { updateTODO } = require('./types');
const mongoose = require('mongoose');
const PORT = 3001;
const { mdbURL } = require('./pass');
const { TODO } = require('./db');
const cors = require('cors')

mongoose.connect(mdbURL);




app.use(cors())
app.use(express.json());

app.post('/createTodo', async function (req, res){
    const payLoad = req.body;
    const parsedPayload = createTODO.safeParse(payLoad);

    if(!parsedPayload.success){
        return res.status(400).json(parsedPayload.error);
    } else {
        const todo = new TODO({
            title: payLoad.title,
            description: payLoad.description,
            status: payLoad.status,
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
        return res.status(200).json({todos});
    }
})

app.put('/completed', async function (req, res){
    const payLoad = req.body;
    const parsedPayload = updateTODO.safeParse(payLoad);
    const todo = await TODO.findOne({_id: parsedPayload.data._id});
    todo.status = parsedPayload.data.status;
    await todo.save();
    return res.status(200).json({message: 'TODO updated successfully'});
})

app.listen(PORT, function (){
    console.log(`Server started on port ${PORT}`);
})

