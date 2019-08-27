const Joi = require('joi');

// Generic Schema Models.

const emailSchema = Joi.string().email();
const integerSchema = Joi.number().integer();
const nameSchema = Joi.string().regex(/^[\w\- ][\w\- ]*$/i);
const descriptionSchema = Joi.string().regex(/^[\w! \n@$%&*()+\-=\[\]{};':"\\,.<>\/?]*$/i);
const dateSchema = Joi.date();
const searchSchema = Joi.string();
const passwordSchema = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
// Particular Schema Models as required by the APIs.

const loginSchema = Joi.object().keys({
    u_email: emailSchema.max(200).required(),
    u_password: descriptionSchema.allow('').optional()
});

const registerSchema = Joi.object().keys({
    u_email: emailSchema.max(200).required(),
    u_password: passwordSchema.allow('').optional(),
    u_name: nameSchema.allow('').required()
});


module.exports = {
    loginSchema,
    registerSchema
};