const Joi=require("joi");

module.exports = {
    getAllBrand: Joi.object({
        limit: Joi.number().optional(),
        page: Joi.number().optional(),
    }),
    getBrandById: Joi.object({
        id: Joi.number().required(),
    }),
    createBrand: Joi.object({
        name: Joi.string().required(),
    }),
    updateBrand: Joi.object({
        name: Joi.string().optional(),
    }),
}