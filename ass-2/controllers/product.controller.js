const products = require('../db/products');
const { CustomError } = require('../lib/error');
const {
  findProduct,
  findProductIndex,
  validateRequestId,
  validateRequestName,
} = require('../lib/utils');

const addProduct = (req, res) => {
  if (!validateRequestName(req)) {
    throw new CustomError({
      statusCode: 400,
      message: 'Enter a valid name with more than 3 characters',
    });
  }

  const { name } = req.body;

  const newProduct = {
    id: crypto.randomUUID(),
    name,
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Product added successfully',
    data: newProduct,
  });
};

const getAllProducts = (req, res) => {
  res.status(200).json({ success: true, products: products });
};

const getSingleProduct = (req, res) => {
  if (!validateRequestId(req)) {
    throw new CustomError({
      statusCode: 400,
      message: 'Product ID must be provided',
    });
  }

  const { productId } = req.params;

  const matchingProduct = findProduct(productId);

  if (!matchingProduct) {
    throw new CustomError({
      statusCode: 404,
      message: `No product with id: ${productId} was found`,
    });
  }

  res
    .status(200)
    .json({ success: true, message: 'Product found', data: matchingProduct });
};

const updateProduct = (req, res) => {
  if (!validateRequestId(req) || !validateRequestName(req)) {
    throw new CustomError({
      statusCode: 400,
      message: 'Must provide product ID and new name',
    });
  }

  const { productId } = req.params;
  const { name } = req.body;

  const matchingProduct = findProduct(productId);
  const matchingProductIndex = findProductIndex(productId);

  if (matchingProductIndex === -1 && !matchingProduct) {
    throw new CustomError({
      statusCode: 404,
      message: `Cannot delete non-existing product`,
    });
  }

  const updatedProduct = { ...matchingProduct, name };

  products[matchingProductIndex] = updatedProduct;

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
  });
};

const deleteProduct = (req, res) => {
  if (!validateRequestId(req)) {
    throw new CustomError({
      statusCode: 400,
      message: 'Product ID must be provided',
    });
  }

  const { productId } = req.params;

  const matchingProduct = findProduct(productId);
  const matchingProductIndex = findProductIndex(productId);

  if (matchingProductIndex === -1 && !matchingProduct) {
    throw new CustomError({
      statusCode: 404,
      message: `Cannot delete non-existing product`,
    });
  }

  products.splice(matchingProductIndex, 1);

  res.status(204).json({
    success: true,
    message: 'Resource removed successfully',
    data: matchingProduct,
  });
};

const handleWrongMethod = (req, res) => {
  throw new CustomError({
    statusCode: 405,
    message: `${req.method} method not allowed`,
  });
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  handleWrongMethod,
};
