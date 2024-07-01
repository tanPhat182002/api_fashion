const Product = require('../models/Product')
const ProductItem = require('../models/ProductItem')
const ProductImage = require('../models/ProductImage')
const sequelize=require('../databases/connect')
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({
           include: ['category', 'brand', 'images', 'items'],
        });

        return res.status(200).json({
            success: true,
            message: 'Lấy danh sách sản phẩm thành công',
            data: products
        });
    } catch (error) {
        next(error);
    }
};
const createProduct = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { name, price, description, sku, categoryId, brandId, colors, sizes } = req.body;

        // Create the product within the transaction
        const product = await Product.create({
            name,
            price,
            description,
            sku: sku.toUpperCase(),
            categoryId,
            brandId
        }, { transaction: t });

        // Create product items for each color and size combination within the transaction
        for (let color of colors) {
            for (let size of sizes) {
                await ProductItem.create({
                    productId: product.id,
                    color,
                    size,
                    price: price,
                    sku: `${sku.toUpperCase()}-${color.toUpperCase()}-${size.toUpperCase()}`
                }, { transaction: t });
            }
        }

        // Commit the transaction
        await t.commit();

        return res.status(201).json({
            success: true,
            message: 'Thêm sản phẩm thành công',
            data: product
        });
    } catch (error) {
        // Rollback the transaction
        await t.rollback();
        next(error); // Pass the error to the error handling middleware
    }
};
const uploadImage = async (req, res, next) => {
    try {
        const { file } = req;
        
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng tải lên một file hình ảnh'
            });
        }
console.log('req.files',req.files)
        // Assuming you want to create a ProductImage record in the database
        const productId = req.params.id;
        for (let file of req.files) {
            await ProductImage.create({
                productId,
                url: file.filename
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Tải ảnh lên thành công',
            data: file.filename
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,uploadImage,getAllProducts
};
