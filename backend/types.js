const zod = require('zod');


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
};

// Path: backend/index.js