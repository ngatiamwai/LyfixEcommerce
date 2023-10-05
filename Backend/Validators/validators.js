const joi = require('joi');

const registerSchema = joi.object({
  firstName: joi.string().min(3).required().regex(/^[a-zA-Z]+$/).messages({
    'string.empty': 'First Name is required',
    'string.min': 'First Name must be at least 3 characters long',
    'string.pattern.base': 'First Name must only contain letters',
    'any.required': 'First Name is required',
  }),
  lastName: joi.string().min(3).required().regex(/^[a-zA-Z]+$/).messages({
    'string.empty': 'Last Name is required',
    'string.min': 'Last Name must be at least 3 characters long',
    'string.pattern.base': 'Last Name must only contain letters',
    'any.required': 'Last Name is required',
  }),
  email: joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
  }),
  phoneNumber: joi.string().required().messages({
    'string.empty': 'Phone number is required',
    'any.required': 'Phone number is required',
  }),
});
const loginSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: joi.string().required()
})

module.exports = {
  registerSchema,
  loginSchema
};
