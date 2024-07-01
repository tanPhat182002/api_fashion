const {sequelize} = require('../databases/connect');
const {DataTypes} = require('sequelize');
const Role = sequelize.define('Role', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, 

{
    // Other model options go here
    tableName: 'roles',
    timestamps: true
});
module.exports = Role;