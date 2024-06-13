const zod = require('zod');

const signupLogin = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    fullname: zod.string(),
});

const updateTODO = zod.object({
    id: zod.string(),
    status: zod.boolean(),
});

const createTODO = zod.object({
    title: zod.string(),
    description: zod.string(),
    deadline:zod.string(),
    status: zod.boolean(),
});

module.exports = {
    signupLogin,
    updateTODO,
    createTODO,
};

// Path: backend/index.js