const Joi = require('joi');
const registerSchema = Joi.object({
    fullname: Joi.string().min(3).required().messages({
        
        'string.empty': 'Fullname không được để trống',
        'string.min': 'Fullname phải có ít nhất 3 ký tự',
       
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password không được để trống',
        'string.min': 'Password phải có ít nhất 6 ký tự',
    }),

})
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password không được để trống',
        'string.min': 'Password phải có ít nhất 6 ký',
    }),
})
const resendSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
})
const verifyEmailSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
    otp: Joi.string().min(5).required().messages({
        'string.empty': 'OTP không được để trống',
        'string.min': 'OTP phải có ít nhất 5 ký tự',
    }),
})
const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
})
const verifyForgotTokenSchema = Joi.object({
    token: Joi.string()
              .hex()
              .length(64)
              .required()
              .messages({
                  'string.empty': 'Token không được để trống',
                  'string.hex': 'Token phải là một chuỗi hex',
                  'string.length': 'Token phải có độ dài 64 ký tự',
                  'any.required': 'Token là bắt buộc'
              })
});

const resetPasswordSchema = Joi.object({
    token: Joi.string()
    .hex()
    .length(64)
    .required()
    .messages({
        'string.empty': 'Token không được để trống',
        'string.hex': 'Token phải là một chuỗi hex',
        'string.length': 'Token phải có độ dài 64 ký tự',
        'any.required': 'Token là bắt buộc'
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.empty': 'Password không được để trống',
        'string.min': 'Password phải có ít nhất 6 ký tự',
    }),
})

module.exports = {
    registerSchema,loginSchema,resendSchema,verifyEmailSchema,forgotPasswordSchema,verifyForgotTokenSchema,resetPasswordSchema
}
