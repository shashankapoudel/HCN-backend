const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        // required: true
    },
    email: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('User', UserSchema)