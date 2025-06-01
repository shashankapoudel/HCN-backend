const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const CartSchema = new mongoose.Schema({

    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    cartItems: [cartItemSchema]



})

module.exports = mongoose.model('Cart', CartSchema)