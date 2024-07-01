const { sequelize } = require('../databases/connect')
const { DataTypes } = require('sequelize')
const Token = sequelize.define(
    'Token',
    {
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
        //type 'verify-email' ,forgot-password, 'refresh-token'
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },

    {
        // Other model options go here
        tableName: 'tokens',
        timestamps: true
    }
)
module.exports = Token
