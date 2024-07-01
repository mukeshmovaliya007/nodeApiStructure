const { DATABASE, DB_USER, DB_PASS, DB_HOST, DB_LOG_QUERY } = require('./../configs/env.config');
const { Sequelize } = require('sequelize');

const sequelize_connection = new Sequelize(
  DATABASE,
  DB_USER,
  DB_PASS, {
  host: DB_HOST,
  logging: DB_LOG_QUERY == 'true' ? console.log : false,
  dialect: 'mysql',
  operatorsAliases: 0,
  timezone: "-07:00"
});

sequelize_connection.authenticate()
  .then((state) => {
    console.info('MYSQL Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the MYSQL database!!!');
  });


module.exports = sequelize_connection;