const mongoose = require('mongoose')

const FaqSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        enum: ['General', 'Products', 'Shipping and Orders', 'Product Maintenance', 'Customer Support', 'Refund Policy']
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Faq', FaqSchema)