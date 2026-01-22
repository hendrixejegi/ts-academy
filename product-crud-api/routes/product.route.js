const express = require('express');
const {
  addProduct,
  getProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
} = require('../controllers/product.controller');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.route('/').post([checkAuth, addProduct]).get(getProducts);

router
  .route('/:productId')
  .get(getProductByID)
  .patch([checkAuth, updateProductByID])
  .delete([checkAuth, deleteProductByID]);

module.exports = router;
