const {sequelize} = require('../databases/connect');
const {DataTypes} = require('sequelize');
const {USER_STATUS} = require('../constants/UserStatus');
const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue:USER_STATUS.UNACTIVE
    },
    phone : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
   
}, 

{
    // Other model options go here
    tableName: 'users',
    timestamps: true
});
module.exports = User;