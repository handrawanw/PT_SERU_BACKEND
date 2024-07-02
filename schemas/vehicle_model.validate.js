const Joi=require("joi");

module.exports = {
    getAllModel: Joi.object({
        limit: Joi.number().optional(),
        page: Joi.number().optional(),
    }),
    createModel: Joi.object({
        name: Joi.string().required(),
        type_id: Joi.number().required(),
    }),
    updateModel: Joi.object({
        name: Joi.string().optional(),
        type_id: Joi.number().optional(),
    }),
}