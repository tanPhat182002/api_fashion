const Brand = require('../models/Brand');
const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll()
        return res.status(200).json({
            status: 'true',
            message: 'Lấy danh sách thành công',
            data: brands
        })
    } catch (err) {
        next(err)
    }
}
const getBrandById = async (req, res) => {
    try {
        const { id } = req.params
        const brand = await Brand.findByPk(id)
        if (!brand) {
            return res.status(404).json({
                status: 'false',
                message: 'Thương hiệu không tồn tại'
            })
        }
        return res.status(200).json({
            status: 'true',
            message: 'Lấy thương hiệu thành công',
            data: brand
        })
    } catch (err) {
        next(err)
    }
}
const createBrand = async (req, res) => {
    try {
        const { name } = req.body
        const existedBrand = await Brand.findOne({ where: { name } })
        if (existedBrand) {
            return res.status(400).json({
                status: 'false',
                message: 'Thương hiệu đã tồn tại'
            })
        }
        const brand = await Brand.create({ name })
        return res.status(201).json({
            status: 'true',
            message: 'Thêm mới thành công',
            data: brand
        })
    } catch (err) {
        next(err)
    }
}
const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params
        const brand = await Brand.findByPk(id)
        if (!brand) {
            return res.status(404).json({
                status: 'false',
                message: 'Thương hiệu không tồn tại'
            })
        }
        await brand.destroy()
        return res.status(200).json({
            status: 'true',
            message: 'Xóa thành công'
        })
    } catch (err) {
        next(err)
    }
}
const updateBrand = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const brand = await Brand.findByPk(id)
        if (!brand) {
            return res.status(404).json({
                status: 'false',
                message: 'Thương hiệu không tồn tại'
            })
        }
        await brand.update({ name })
        return res.status(200).json({
            status: 'true',
            message: 'Cập nhật thành công',
            data: brand
        })
    } catch (err) {
        next(err)
    }
}
module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    deleteBrand,
    updateBrand
}