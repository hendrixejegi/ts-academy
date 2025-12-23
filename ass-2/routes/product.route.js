const express = require('express');
const {
  addProduct,
  getAllProducts,
} = require('../controllers/product.controller');

const route = express.Router();

route.route('/').post(addProduct).get(getAllProducts);

module.exports = route;
