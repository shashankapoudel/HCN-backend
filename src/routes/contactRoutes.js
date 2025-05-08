const express = require('express');
const { getContactDetails } = require('../controllers/contactController');

const router = express.Router()

router.post('/', getContactDetails)

module.exports = router;