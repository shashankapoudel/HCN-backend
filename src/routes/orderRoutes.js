const express = require('express')
const { createOrders, trackorder } = require('../controllers/orderController')

const router = express.Router()

router.post('/createorder', createOrders)
router.post('/trackorder', trackorder)

module.exports = router;