require('dotenv').config();

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
};

module.exports = config;
