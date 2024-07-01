const {sequelize} = require('../databases/connect');
const {DataTypes} = require('sequelize');
const Category = sequelize.define('Categories', {
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
    tableName: 'Categories',
    timestamps: true
});
module.exports = Category;