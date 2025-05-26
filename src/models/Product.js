const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
        enum: ["singing-bowls", "ritual-items", "himalayas-products"]
    },
    subcategory: {
        type: String,
        required: true,
    },

    subcategorycategory: {
        type: String,
        required: true
    },

    weight: {
        type: Number,

        required: true,
    },
    stock: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,

    },
    material: {
        type: String,
        required: true,
        enum: ["metal", "crystal", "wood"]
    },
    sound: {
        type: String,
        // required: true,
    },
    images: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        // required: true,
    },

})
module.exports = mongoose.model('Product', ProductSchema)