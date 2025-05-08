const express = require('express');
const { getBlog } = require('../controllers/blogController');

const router = express.Router()

router.post('/getblog', getBlog)

module.exports = router;