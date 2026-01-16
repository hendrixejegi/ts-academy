const { CustomError } = require('../lib/error');
const { zodParse, sendSuccess, sendError } = require('../lib/utils');
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

const getProducts = async (req, res) => {
  const products = await Product.Model.find({});

  const meta = {
    total: products.length,
  };

  sendSuccess(res, 200, { data: products, meta });
};

const getProductByID = async (req, res) => {
  const allowed = zodParse(Product.FindProductByIDSchema, req.params);

  const product = await Product.Model.findById({ _id: allowed.productId });

  if (!product) {
    return sendError(res, 404, { message: 'Product not found' });
  }

  sendSuccess(res, 200, { data: product });
};

const updateProductByID = async (req, res) => {
  const allowedParams = zodParse(Product.FindProductByIDSchema, req.params);
  const allowedBody = zodParse(Product.UpdateSchema, req.body);

  if (Object.keys(allowedBody).length === 0) {
    return sendError(res, 400, {
      message: 'No value provided',
      code: 'bad_request',
    });
  }

  const options = {
    new: true,
  };

  const product = await Product.Model.findByIdAndUpdate(
    {
      _id: allowedParams.productId,
    },
    allowedBody,
    options
  );

  if (!product) {
    return sendError(res, 404, { message: 'Product not found' });
  }

  sendSuccess(res, 200, { data: product });
};

const deleteProductByID = async (req, res) => {
  const allowed = zodParse(Product.FindProductByIDSchema, req.params);

  const product = await Product.Model.findByIdAndDelete(
    { _id: allowed.productId },
    { includesResultMetadata: false }
  );

  if (!product) {
    return sendError(res, 404, { message: 'Product not found' });
  }

  sendSuccess(res, 204, { data: product });
};

module.exports = {
  addProduct,
  getProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
};
