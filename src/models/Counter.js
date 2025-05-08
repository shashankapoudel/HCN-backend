const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    current: { type: Number, default: 0 },
});

module.exports = mongoose.model('Counter', CounterSchema);
