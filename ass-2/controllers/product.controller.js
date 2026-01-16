const { CustomError } = require('../lib/error');
const { zodParse, sendSuccess } = require('../lib/utils');
const Product = require('../db/models/product.model');

const addProduct = async (req, res) => {
  const allowed = zodParse(Product.InputSchema, req.body);

  const product = new Product.Model(allowed);
  await product.save();

  sendSuccess(res, 201, {
    message: 'Product added successfully',
    data: product,
  });
};

/*
const getAllProducts = (req, res) => {
  res.status(200).json({ success: true, products: products });
};

const getSingleProduct = (req, res) => {
  if (!validateRequestParams(req)) {
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
  checkValidateRequestResult(validateRequestParams(req), 'Must provide id');
  checkValidateRequestResult(validateRequestBody(req), 'Must provide name');

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
  checkValidateRequestResult(validateRequestParams(req), 'Must provide id');

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
*/

module.exports = {
  addProduct,
  /*
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  handleWrongMethod,
  */
};
