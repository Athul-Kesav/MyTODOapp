const zod = require('zod');

const signupLogin = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    fullname: zod.string(),
});

const createTODO = zod.object({
    title: zod.string(),
    description: zod.string(),
    deadline:zod.string(),
    status: zod.boolean(),
});

module.exports = {
    signupLogin,
    createTODO,
};

// Path: backend/index.js