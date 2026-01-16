require('dotenv').config();

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
};

console.log('Environment:', config.env);

module.exports = config;
