const Joi=require("joi");

module.exports = {
    getAllPriceList: Joi.object({
        limit: Joi.number().optional(),
        page: Joi.number().optional(),
    }),
    createPriceList: Joi.object({
        price: Joi.string().required(),
        vehicle_year_id: Joi.number().required(),
        vehicle_model_id: Joi.number().required(),
    }),
    updatePriceList: Joi.object({
        price: Joi.string().required(),
        vehicle_year_id: Joi.number().required(),
        vehicle_model_id: Joi.number().required(),
    }),
    deletePriceList: Joi.object({
        id: Joi.number().required(),
    }),
}