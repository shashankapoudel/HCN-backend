const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true,
    },
    customerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    email: {
        type: String,
        required: true
    }
});

// Generate orderID before validation
OrderSchema.pre('validate', async function (next) {
    if (!this.orderID) {
        console.log('Generating new order ID...');
        const Counter = mongoose.model('Counter'); // Ensure Counter model is loaded
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

