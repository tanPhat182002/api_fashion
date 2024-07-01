const {sequelize} = require('../databases/connect');
const {DataTypes} = require('sequelize');
const Brand = sequelize.define('Brands', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    
}, 

{
    // Other model options go here
    tableName: 'Brands',
    timestamps: true
});
module.exports = Brand;