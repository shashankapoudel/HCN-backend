const express = require('express')
const { addToCart, getCartItems, updateCart, deleteCart } = require('../controllers/cartController')

const router = express.Router()

router.post('/add', addToCart)
router.get('/get/:sessionId', getCartItems)
router.post('/update', updateCart)
router.post('/remove', deleteCart)

module.exports = router;