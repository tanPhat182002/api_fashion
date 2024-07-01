const {sequelize} = require('../databases/connect');
const {DataTypes} = require('sequelize');
const Product = require('./Product')

const ProductItem = sequelize.define(
    'ProductItem',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        promotion_price: {
            type: DataTypes.FLOAT,
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
        tableName: 'product_items'
    }
)

module.exports = ProductItem
