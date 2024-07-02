const Joi=require("joi");

module.exports = {
    login: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
    register: Joi.object({
        name : Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
    update_password: Joi.object({
        old_password: Joi.string().required(),
        new_password: Joi.string().required(),
    }),
}