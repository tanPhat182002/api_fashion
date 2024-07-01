const Category = require('../models/Category')

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.findAll()
        return res.status(200).json({
            status: 'true',
            message: 'Lấy danh sách thành công',
            data: categories
        })
    } catch (err) {
        next(err)
    }
}
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findByPk(id)
        if (!category) {
            return res.status(404).json({
                status: 'false',
                message: 'Danh mục không tồn tại'
            })
        }
        return res.status(200).json({
            status: 'true',
            message: 'Lấy danh mục thành công',
            data: category
        })
    } catch (err) {
        next(err)
    }
}
const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const existedCategory = await Category.findOne({ where: { name } })
        if (existedCategory) {
            return res.status(400).json({
                status: 'false',
                message: 'Danh mục đã tồn tại'
            })
        }
        const category = await Category.create({ name })
        return res.status(201).json({
            status: 'true',
            message: 'Thêm mới thành công',
            data: category
        })
    } catch (err) {
        next(err)
    }
}
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findByPk(id)
        if (!category) {
            return res.status(404).json({
                status: 'false',
                message: 'Danh mục không tồn tại'
            })
        }
        await category.destroy()
        return res.status(200).json({
            status: 'true',
            message: 'Xóa thành công'
        })
    } catch (err) {
        next(err)
    }
}
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const category = await Category.findByPk(id)
        if (!category) {
            return res.status(404).json({
                status: 'false',
                message: 'Danh mục không tồn tại'
            })
        }
        await category.update({ name })
        return res.status(200).json({
            status: 'true',
            message: 'Cập nhật thành công'
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { createCategory, deleteCategory, updateCategory, getAllCategory, getCategoryById}