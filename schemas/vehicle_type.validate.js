const Joi=require("joi");

module.exports = {
    getAllType: Joi.object({
        limit: Joi.number().optional(),
        page: Joi.number().optional(),
    }),
    createType: Joi.object({
        name: Joi.string().required(),
        brand_id: Joi.number().required(),
    }),
    updateType: Joi.object({
        name: Joi.string().required(),
        brand_id: Joi.number().required(),
    }),
    deleteType: Joi.object({
        id: Joi.number().required(),
    }),
}