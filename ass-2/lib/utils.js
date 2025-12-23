const products = require('../db/products');

const findProduct = (id) => {
  return products.find((product) => product.id === id);
};

const findProductIndex = (id) => {
  return products.findIndex((product) => product.id === id);
};

const validateRequestName = (req) => {
  let isValid = false;

  if (typeof req.body === 'object' && 'name' in req.body) {
    if (req.body.name.length > 3) {
      isValid = true;
    }
  }

  return isValid;
};

const validateRequestId = (req) => {
  let isValid = false;

  if (typeof req.params === 'object' && 'productId' in req.params) {
    isValid = true;
  }

  return isValid;
};

module.exports = {
  findProduct,
  findProductIndex,
  validateRequestId,
  validateRequestName,
};
