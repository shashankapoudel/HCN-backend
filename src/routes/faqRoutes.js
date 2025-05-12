const express = require('express');
const { storeFaq, sendFaq, deleteFaq, updateFaq } = require('../controllers/faqController');

const router = express.Router()

router.post('/storefaq', storeFaq)
router.get('/getfaq', sendFaq)
router.delete('/deletefaq', deleteFaq)
router.post('/updatefaq/:id', updateFaq)

module.exports = router;