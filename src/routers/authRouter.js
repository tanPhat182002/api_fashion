const {Router} = require('express');
const { registerController, resendController, verifyEmailController, forgotPasswordController, verifyForgotToken,resetPasswordController, loginController } = require('../controllers/AuthController');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { registerSchema, resendSchema, verifyEmailSchema, forgotPasswordSchema, verifyForgotTokenSchema, resetPasswordSchema, loginSchema } = require('../validations/authSchema');
const authRouter = Router()
authRouter.post('/register',validatorMiddleware(registerSchema), registerController)
authRouter.post('/login',validatorMiddleware(loginSchema),loginController)
authRouter.post('/resend-otp',validatorMiddleware(resendSchema), resendController)
authRouter.post('/verify-email',validatorMiddleware(verifyEmailSchema), verifyEmailController)
authRouter.post('/forgot-password',validatorMiddleware(forgotPasswordSchema) ,forgotPasswordController)
authRouter.post('/verify-forget-token',validatorMiddleware(verifyForgotTokenSchema), verifyForgotToken)
authRouter.patch('/reset-password',validatorMiddleware(resetPasswordSchema),resetPasswordController)
module.exports = authRouter