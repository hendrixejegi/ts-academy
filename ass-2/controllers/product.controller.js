const products = require('../db/products');

const getAllProducts = (req, res) => {
  res.status(200).json({ success: true, data: products });
};

module.exports = { getAllProducts };
