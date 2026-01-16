const express = require('express');
const {
  addProduct,
  getProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
} = require('../controllers/product.controller');

const router = express.Router();

router.route('/').post(addProduct).get(getProducts);

router
  .route('/:productId')
  .get(getProductByID)
  .patch(updateProductByID)
  .delete(deleteProductByID);

module.exports = router;
