const Order = require("../models/Order");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const createOrders = asyncHandler(async (req, res) => {

    const { customerName, address, totalAmount } = req.body;

    if (!customerName || !address || !totalAmount) {
        throw new ApiError(400, 'All fields are required')
    }

    const newOrder = new Order({
        customerName,
        address,
        totalAmount,
    })
    await newOrder.save();
    return res.status(201).json(new ApiResponse(201, newOrder, 'New Order saved successfully'))
})



const trackorder = asyncHandler(async (req, res) => {

    const { email, orderID } = req.body;

    if (!orderID) {
        throw new ApiError(400, 'OrderID is required')
    }

    const order = await Order.findOne({ orderID })
    if (!order) {
        throw new ApiError(400, 'No order found for this ID')
    }
    res.status(201).json(new ApiResponse(200, order, 'Order found for this id'))


})


module.exports = { createOrders, trackorder }