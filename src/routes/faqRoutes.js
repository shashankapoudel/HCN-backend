const express = require('express');
const { storeFaq, sendFaq, deleteFaq } = require('../controllers/faqController');

const router = express.Router()

router.post('/storefaq', storeFaq)
router.get('/getfaq', sendFaq)
router.delete('/deletefaq', deleteFaq)
router.post('/updatefaq', deleteFaq)

module.exports = router;