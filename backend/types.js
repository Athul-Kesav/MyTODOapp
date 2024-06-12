const { sign } = require('jsonwebtoken');
const zod = require('zod');

const signup = zod.object({
    username: zod.string(),
    password: zod.string().min(8),
    fullname: zod.string(),
});

const login = zod.object({
    token: zod.string(),
});

const updateTODO = zod.object({
    id: zod.string(),
    status: zod.boolean(),
});

const createTODO = zod.object({
    title: zod.string(),
    description: zod.string(),
    status: zod.boolean(),
});

module.exports = {
    updateTODO,
    createTODO,
    signup,
    login,
};

// Path: backend/index.js