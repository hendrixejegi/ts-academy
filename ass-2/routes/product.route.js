const express = require('express');
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
} = require('../controllers/product.controller');

const router = express.Router();

router.route('/').post(addProduct).get(getAllProducts);
router.route('/:productId').get(getSingleProduct);

module.exports = router;
