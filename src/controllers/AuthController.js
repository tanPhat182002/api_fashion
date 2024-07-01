const User = require('../models/User')
const UserOtp = require('../models/UserOtp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailServices = require('../services/MailServices')
const { USER_STATUS } = require('../constants/UserStatus')
const { omit, pick } = require('lodash')
const { TOKEN_TYPE } = require('../constants/TokenType')
const Token = require('../models/Token')
const randomBytes = require('../utils/randomBytes')
const generateOTP = require('../utils/randomOTP')

const registerController = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        const existedUser = await User.findOne({ where: { email } })
        if (existedUser) {
            return res.status(400).json({ status: 'false', message: 'Email đã tồn tại' })
        }

        const otp = generateOTP()
        const [createUser] = await Promise.all([
            User.create({
                fullname,
                email,
                password: bcrypt.hashSync(password, 10),
                role_id: 2
            }),
            UserOtp.create({
                email,
                otp
            })
        ])

        emailServices.sendMail(
            email,
            'Đăng ký tài khoản thành công',
            'Chúc mừng bạn đã đăng ký thành công',
            `<h1 style="color:red;">Mã xác thực OTP của bạn là: ${otp}</h1>`
        )
        const user= createUser.dataValues
        const finalUser = pick(user,['fullname','email'])

        return res.status(201).json({
            status: 'true',
            message: 'Đăng ký thành công',
            data: finalUser
        })
    } catch (err) {
        next(err)
    }
}
const loginController = async (req, res, next) => {
      try {
         const { email, password } = req.body
         const existedUser = await User.findOne({ where: { email } })
      
         // if (existedUser.status === USER_STATUS.UNACTIVE) {
         //       return res.status(400).json({ status: 'false', message: 'Tài khoản chưa được kích hoạt' })
         // }
         const isMatch = bcrypt.compareSync(password, existedUser.password)
         if (!isMatch|| !existedUser) {
               return res.status(400).json({ status: 'false', message: 'Tài khoản  hoặc Mật khẩu không chính xác' })
         }
         const user = pick(existedUser,['id','fullname'])
         //tạo token
         const token =jwt.sign({id:existedUser.id},'trantanphat',{expiresIn:'1h'})
         return res.status(200).json({
               status: 'true',
               message: 'Đăng nhập thành công',
               data: user,
               token
               
         })
      } catch (err) {
         next(err)
      }
}
const resendController = async (req, res, next) => {
    try {
        const { email } = req.body
        const existedUser = await User.findOne({ where: { email } })
        if (!existedUser) {
            return res.status(400).json({ status: 'false', message: 'Email chưa tồn tại' })
        }
        if (existedUser.status === USER_STATUS.ACTIVE) {
            return res.status(400).json({ status: 'false', message: 'Tài khoản đã được kích hoạt' })
        }

        const otp = generateOTP()
        const existedOtp = await UserOtp.findOne({ where: { email } })
        if (existedOtp) {
            await existedOtp.destroy()
        }

        await UserOtp.create({
            email,
            otp
        })

        emailServices.sendMail(
            email,
            'Mã OTP xác thực',
            'Mã OTP của bạn là:',
            `<h1 style="color:red;">Mã xác thực OTP của bạn là: ${otp}</h1>`
        )

        return res.status(201).json({
            status: 'true',
            message: 'Gửi lại mã otp thành công'
        })
    } catch (err) {
        next(err)
    }
}

const verifyEmailController = async (req, res, next) => {
    try {
        const { email, otp } = req.body
        const existed = await UserOtp.findOne({ where: { email, otp } })
        if (!existed) {
            return res.status(400).json({
                status: 'false',
                message: 'Mã OTP không chính xác'
            })
        }

        await Promise.all([User.update({ status: USER_STATUS.ACTIVE }, { where: { email } }), existed.destroy()])

        return res.status(200).json({
            status: 'true',
            message: 'Xác thực thành công'
        })
    } catch (err) {
        next(err)
    }
}

const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body
        const existedUser = await User.findOne({ where: { email } })
        if (!existedUser) {
            return res.status(400).json({
                status: 'false',
                message: 'Email chưa tồn tại'
            })
        }
        if (existedUser.status === USER_STATUS.UNACTIVE) {
            return res.status(400).json({
                status: 'false',
                message: 'Tài khoản chưa được kích hoạt'
            })
        }

        const existedToken = await Token.findOne({ where: { email, type: TOKEN_TYPE.RESET_PASSWORD } })
        if (existedToken) {
            await existedToken.destroy()
        }

        const token = randomBytes(32)
        await Token.create({
            token,
            email,
            type: TOKEN_TYPE.RESET_PASSWORD
        })

        emailServices.sendMail(
            email,
            'Reset Password',
            'Here is your password reset token:',
            `<h1 style="color:red;">Token: ${token}</h1>`
        )

        return res.status(200).json({
            status: 'true',
            message: 'vui lòng kiểm tra email để lấy reset mật khẩu'
        })
    } catch (err) {
        next(err)
    }
}

const verifyForgotToken = async (req, res, next) => {
    try {
        const { token } = req.body
        const existed = await Token.findOne({ where: { token, type: TOKEN_TYPE.RESET_PASSWORD } })
        if (!existed) {
            return res.status(400).json({
                status: 'false',
                message: 'Token không hợp lệ'
            })
        }

        return res.status(200).json({
            status: 'true',
            message: 'Token hợp lệ'
        })
    } catch (err) {
        next(err)
    }
}

const resetPasswordController = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body

        // kiểm tra xem token có tồn tại không
        const existedToken = await Token.findOne({ where: { token, type: TOKEN_TYPE.RESET_PASSWORD } })

        if (!existedToken) {
            return res.status(400).json({
                status: 'false',
                message: 'Token không hợp lệ'
            })
        }
     
// kiểm tra xem user có tồn tại không
        const user = await User.findOne({ where: { email: existedToken.email } })
        if (!user) {
            return res.status(404).json({
                status: 'false',
                message: 'User không tìm thấy'
            })
        }

        // Cập nhật mật khẩu mới
        user.password = bcrypt.hashSync(newPassword, 10)
        await user.save()

        // Huỷ bỏ token sau khi đã sử dụng
        await existedToken.destroy()

        return res.status(200).json({
            status: 'true',
            message: 'Mật khẩu đã được cập nhật thành công'
        })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    registerController,
    loginController,
    resendController,
    verifyEmailController,
    forgotPasswordController,
    verifyForgotToken,
    resetPasswordController
}
