const Joi = require('joi');
const createCategorySchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.empty': 'Name không được để trống',
        'string.min': 'Name phải có ít nhất 2 ký tự',
    }),
   
})
const updateCategorySchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.empty': 'Name không được để trống',
        'string.min': 'Name phải có ít nhất 2 ký tự',
    }),
})
module.exports = { createCategorySchema, updateCategorySchema}