const dotenv = require('dotenv');
dotenv.config();

const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DATABASE,
  DB_LOG_QUERY
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DATABASE,
  DB_LOG_QUERY  
};
