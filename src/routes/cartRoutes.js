const express = require('express')
const { addToCart, getCartItems, updateCart } = require('../controllers/cartController')

const router = express.Router()

router.post('/add', addToCart)
router.get('/get/:sessionId', getCartItems)
router.post('/update', updateCart)

module.exports = router;