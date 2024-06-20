const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const { signupLogin, createTODO } = require('./types');
const { mdbURL, jwtSecret, PORT } = { mdbURL: process.env.MDB_URL, jwtSecret: process.env.JWT_SECRET, PORT: process.env.PORT}
const { USER } = require('./db');

const app = express();
mongoose.connect(mdbURL);

app.use(cors())
app.use(express.json());

//Functions
const hasher = (pass) => {
    const hash = crypto.createHash('sha256');
    hash.update(pass);
    return hash.digest('hex');
}

//Middlewares

const zodVerifier = (schema) => (req, res, next) => {
    const parsedPayload = schema.safeParse(req.body)
    if (!parsedPayload.success) {
        res.status(400).send({
            msg: "Invalid request"
        })
    } else {
        next();
    }
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).send({
                    msg: "Bad/Expired Token"
                });
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

//Routes

//SIGNUP ROUTE
app.post('/signup', zodVerifier(signupLogin), async function (req, res) {
    try {
        const existingUser = await USER.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(409).send({
                msg: "User Already Exists"
            });
            return;
        }

        const hashPass = hasher(req.body.password)

        const details = {
            email: req.body.email,
            password: hashPass,
            fullname: req.body.fullname,
        }

        const user = new USER(details);

        await user.save();
        res.status(201).send({
            msg: "User added",
            token: "Bearer " + jwt.sign(details, jwtSecret)
        });
        console.log("User Added to Database and token sent");

    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).send({
            msg: 'Internal Server Error'
        });
    }
})


//LOGIN ROUTE
app.post('/login', zodVerifier(signupLogin), async (req, res) => {
    const existingUser = await USER.findOne({ email: req.body.email });
    if (!existingUser) {
        res.status(404).send({
            msg: "User Not Found"
        })
        return
    }

    const hashPass = hasher(req.body.password)

    const details = {
        email: req.body.email,
        password: hashPass,
        fullname: existingUser.fullname,
    }

    if (existingUser.password === hashPass) {
        res.status(200).send({
            msg: "Logged in Successfully",
            token: `Bearer ${jwt.sign(details, jwtSecret)}`
        })
    }
})


//TODO CREATION ROUTE
app.post('/user/create-todo', zodVerifier(createTODO), authenticateJWT, async function (req, res) {
    const payLoad = req.body;
    const parsedPayload = createTODO.safeParse(payLoad);

    if (!parsedPayload.success) {
        return res.status(400).send(parsedPayload.error);
    } else {
        const todo = {
            title: payLoad.title,
            description: payLoad.description,
            deadline: payLoad.deadline,
            status: payLoad.status,
        };

        const email = req.user.email;

        try {
            const user = await USER.findOne({ email: email });

            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }

            user.todos.push(todo);
            await user.save();

            return res.status(200).send({ message: 'TODO created successfully' });
        } catch (error) {
            console.error('Error creating TODO:', error);
            return res.status(500).send({ error: 'Internal server error' });
        }
    }
})

//SET TODOS ROUTE
app.put('/user/update-todo', authenticateJWT, async function (req, res) {

    try {
        const email = req.user.email;
        const user = await USER.findOne({ email: email });

        const index = user.todos.findIndex(todo => todo._id.equals(req.body.id));

        if (index !== -1) {
            // Perform the update on todos[index]
            user.todos[index].status = true
            // Update other properties as needed
        } else {
            console.log(`Todo with id ${id} not found`);
        }


        await user.save()

        res.status(200).send({
            msg: "To-Do item updated successfully"
        })

    } catch (error) {
        console.error('Error creating TODO:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})

//REMOVE DONE TO-DOs ROUTE
app.post('/user/update-todo', authenticateJWT, async function (req, res) {
    const email = req.user.email;

    try {
        const user = await USER.findOne({ email: email });

        const index = user.todos.findIndex(todo => todo._id.equals(req.body.id));

        if (index !== -1) {
            // Perform the update on todos[index]
            user.todos.splice(index, 1);
            // Update other properties as needed
        } else {
            console.log(`Todo with id ${id} not found`);
        }

        await user.save();

        return res.status(200).send({ message: 'TODO removed successfully' });
    } catch (error) {
        console.error('Error creating TODO:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})


//GET TODOS ROUTE
app.get('/user/todos', authenticateJWT, async (req, res) => {
    try {
        const email = req.user.email;
        const user = await USER.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const todos = user.todos

        res.status(200).send({
            todos: todos
        })
    } catch (error) {
        console.error('Error creating TODO:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})


//LISTEN FOR REQUESTS
app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
})

