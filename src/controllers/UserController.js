const { where } = require('sequelize')
const User = require('../models/User')
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                role_id: 2
            }
        })
        return res.status(200).json({
            status: 'true',
            message: 'Lấy danh sách user thành công',
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            status: 'false',
            message: 'Lỗi server'
        })
    }
}
const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id
            }
        })
        if (!user) {
            return res.status(404).json({
                status: 'false',
                message: 'Không tìm thấy user'
            })
        }
        return res.status(200).json({
            status: 'true',
            message: 'Lấy user thành công',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: 'false',
            message: 'Lỗi server'
        })
    }
}
module.exports = { getAllUsers , getUserById}
