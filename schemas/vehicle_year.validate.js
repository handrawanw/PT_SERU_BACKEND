const Joi=require("joi");

module.exports = {
    getAllVYear: Joi.object({
        limit: Joi.number().optional(),
        page: Joi.number().optional(),
    }),
    createVYear: Joi.object({
        year: Joi.string().required(),
    }),
    updateVYear: Joi.object({
        year: Joi.string().required(),
    }),
}