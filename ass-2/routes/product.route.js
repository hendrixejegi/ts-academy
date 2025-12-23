const express = require('express');
const { getAllProducts } = require('../controllers/product.controller');

const route = express.Router();

route.get('/', getAllProducts);

module.exports = route;
