const products = require('../db/products');
const { CustomError } = require('../lib/error');

const addProduct = (req, res) => {
  const { name } = req.body;

  if (!name || name.length < 3) {
    throw new CustomError({
      statusCode: 400,
      message: 'Enter a valid name with more than 3 characters',
    });
  }

  const newProduct = {
    id: crypto.randomUUID(),
    name,
  };

  products.push(newProduct);

  res.status(200).json({
    success: true,
    message: 'Product added successfully',
    product: newProduct,
  });
};

const getAllProducts = (req, res) => {
  res.status(200).json({ success: true, data: products });
};

module.exports = { addProduct, getAllProducts };
