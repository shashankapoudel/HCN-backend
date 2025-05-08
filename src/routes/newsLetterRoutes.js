const express = require('express');
const { getInfo } = require('../controllers/newsletterController');

const router = express.Router()

router.post('/getsubscription', getInfo)

module.exports = router;