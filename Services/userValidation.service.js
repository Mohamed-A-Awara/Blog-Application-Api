const Joi = require("joi");

let RegisterSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer(),
    phone: Joi.string(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]")).required(),
});

let LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]")).required(),
});



module.exports = {
    RegisterSchema,LoginSchema
}