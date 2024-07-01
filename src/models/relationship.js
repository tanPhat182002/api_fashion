const User = require('./User');
const Role = require('./Role');
const Product = require('./Product');
const Category = require('./Category');
const Brand = require('./Brand');
const ProductImage = require('./ProductImage');
const ProductItem = require('./ProductItem');
User.belongsTo(Role, {foreignKey: 'role_id'});
Role.hasMany(User, {foreignKey: 'role_id'});
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
})
Category.hasMany(Product, {
    foreignKey: 'categoryId'
})

Product.belongsTo(Brand, {
    foreignKey: 'brandId',
    as: 'brand'
})

Brand.hasMany(Product, {
    foreignKey: 'brandId'
})

ProductImage.belongsTo(Product, {
    foreignKey: 'productId'
})

Product.hasMany(ProductImage, {
    foreignKey: 'productId',
    as: 'images'
})

ProductItem.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
})

Product.hasMany(ProductItem, {
    foreignKey: 'productId',
    as: 'items'
})

