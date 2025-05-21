const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderID: { type: String, unique: true },
    personalInfo: {
        firstName: String,
        lastName: String,
        email: String,
        code: String,
        phone: String,
        country: String,
    },
    shippingAddress: {
        country: String,
        zip: String,
        state: String,
        city: String,
        street: String,
        apartment: String,
        paymentMethod: String,
    },
    items: [
        {
            name: String,
            category: String,
            quantity: Number,
            price: Number,
            image: String,
        },
    ],
    totalAmount: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


OrderSchema.pre('validate', async function (next) {
    if (!this.orderID) {
        console.log('Generating new order ID...');
        const Counter = mongoose.model('Counter');
        const counter = await Counter.findOneAndUpdate(
            { name: 'orderID' },
            { $inc: { current: 1 } },
            { new: true, upsert: true }
        );
        this.orderID = `HCN#${counter.current}`;
        console.log('New order ID:', this.orderID);
    }
    next();
});

module.exports = mongoose.model('Order', OrderSchema);

