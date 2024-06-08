const zod = require('zod');


const updateTODO = zod.object({
    id: zod.string(),
    status: zod.string(),
});

const createTODO = zod.object({
    username: zod.string(),
    id: zod.string(),
    title: zod.string(),
    description: zod.string(),
    status: zod.string(),
});

module.exports = {
    updateTODO,
    createTODO,
};

// Path: backend/index.js