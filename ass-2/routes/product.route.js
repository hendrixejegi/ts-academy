const express = require('express');
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
} = require('../controllers/product.controller');

const router = express.Router();

router.route('/').post(addProduct).get(getAllProducts);
router.route('/:productId').get(getSingleProduct).delete(deleteProduct);

module.exports = router;
