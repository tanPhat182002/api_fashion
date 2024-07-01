const {sequelize} = require('../databases/connect');
const {DataTypes} = require('sequelize');
const UserOtp= sequelize.define('UserOtp', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verified_At: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    
}, 

{
    // Other model options go here
    tableName: 'UserOtp',
    timestamps: true
});
module.exports = UserOtp;