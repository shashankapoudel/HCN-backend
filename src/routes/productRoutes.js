const express = require('express');
const { addProducts, getProductsByCategory, getSingleProduct, getProducts } = require('../controllers/productController');
const upload = require('../middlewares/multer');

const router = express.Router()

router.post('/admin/addproduct', upload.array('images', 5), addProducts)
router.get('/getallproducts', getProducts)
router.get('/:id', getSingleProduct)
router.get('/:category', getProductsByCategory)

module.exports = router;