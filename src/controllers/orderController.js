const Order = require("../models/Order");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const createOrders = asyncHandler(async (req, res) => {

    const { formData } = req.body;
    const newOrder = new Order({ order })

    const savedOrder = await newOrder.save();

    return res.status(201).json(new ApiResponse(201, savedOrder, 'New Order saved successfully'))
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