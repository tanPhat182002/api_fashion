const {sequelize} = require('../databases/connect');
const {DataTypes} = require('sequelize');
const Product = require('./Product')

const ProductImage = sequelize.define(
    'ProductImage',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    },
    {
        tableName: 'product_images'
    }
)

module.exports = ProductImage
