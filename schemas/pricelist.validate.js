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
        price: Joi.string().optional(),
        vehicle_year_id: Joi.number().optional(),
        vehicle_model_id: Joi.number().optional(),
    }),
    deletePriceList: Joi.object({
        id: Joi.number().required(),
    }),
    getPriceListById: Joi.object({
        id: Joi.string().required(),
    }),
}