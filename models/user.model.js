const sequelize_connection = require('../configs/db-connection.config');
const { DataTypes } = require('sequelize');
const UserRoleModel = require('./userRole.model');
const RoleModel = require('./role.model');
const CompanyModel = require('./company.model');

const UserModel = sequelize_connection.define('user', {
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    company_id: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
    },
    username: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    password: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
    
}, {
    tableName: process.env.DB_PREFIX + 'user',
    timestamps: false
});



module.exports = UserModel;