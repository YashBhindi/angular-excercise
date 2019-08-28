const Joi = require('joi');

// Generic Schema Models.

// const emailSchema = Joi.string().email();
const integerSchema = Joi.number().integer();
const nameSchema = Joi.string().regex(/^[\w\- ][\w\- ]*$/i);
const descriptionSchema = Joi.string().regex(/^[\w! \n@$%&*()+\-=\[\]{};':"\\,.<>\/?]*$/i);
const dateSchema = Joi.date();
const searchSchema = Joi.string();
// Particular Schema Models as required by the APIs.

const loginSchema = Joi.object().keys({
    u_email: Joi.string().required(),
    u_password: descriptionSchema.allow('').optional()
});

const registerSchema = Joi.object().keys({
    u_email: Joi.string().required(),
    u_password: Joi.string().allow('').optional(),
    u_name: nameSchema.allow('').required()
});

const studentSchema = Joi.object().keys({
    email: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    age: integerSchema.required()
});


module.exports = {
    loginSchema,
    registerSchema,
    studentSchema
};