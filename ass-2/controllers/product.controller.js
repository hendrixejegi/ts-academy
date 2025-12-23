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

  res.status(201).json({
    success: true,
    message: 'Product added successfully',
    product: newProduct,
  });
};

const getAllProducts = (req, res) => {
  res.status(200).json({ success: true, data: products });
};

const getSingleProduct = (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new CustomError({
      statusCode: 400,
      message: 'Product ID must be provided',
    });
  }

  const matchingProduct = products.find((product) => product.id === productId);

  console.log(productId);

  if (!matchingProduct) {
    throw new CustomError({
      statusCode: 400,
      message: `No product with id: ${productId} was found`,
    });
  }

  res
    .status(200)
    .json({ success: true, message: 'Product found', data: matchingProduct });
};

module.exports = { addProduct, getAllProducts, getSingleProduct };
