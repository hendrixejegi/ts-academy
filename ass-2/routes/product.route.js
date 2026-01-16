const express = require('express');
const {
  addProduct,
  /*
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  handleWrongMethod,
  */
} = require('../controllers/product.controller');

const router = express.Router();

router.route('/').post(addProduct);
/*
  .get(getAllProducts)
  .delete(handleWrongMethod);

router
  .route('/:productId')
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
  */

module.exports = router;
