const zod = require('zod');

const signup = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    fullname: zod.string(),
});

const login = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
});

const createTODO = zod.object({
    title: zod.string(),
    description: zod.string(),
    deadline:zod.string(),
    status: zod.boolean(),
});

module.exports = {
    signup,
    login,
    createTODO,
};

// Path: backend/index.js