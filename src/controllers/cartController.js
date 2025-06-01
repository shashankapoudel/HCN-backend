const Cart = require("../models/Cart");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const addToCart = asyncHandler(async (req, res) => {
    const { sessionId, cartItems } = req.body;
    if (!sessionId || cartItems.length === 0) {
        throw new ApiError(400, 'SessionID or cartItems is required')
    }

    const filteredCartItems = cartItems.map((item) => ({
        id: item._id,
        images: item.images,
        name: item.name,
        price: item.price,
        category: item.category,
        subcategory: item.subcategory,

    }))

    let cart = await Cart.findOne({ sessionId })

    if (!cart) {
        cart = new Cart({ sessionId: sessionId, cartItems: filteredCartItems })
    } else {
        cart.cartItems.push(...filteredCartItems)
    }
    await cart.save();
    console.log(cart);
    res.status(201).json(new ApiResponse(200, 'Items added to cart successfully'))

})


const getCartItems = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;

    if (!sessionId) {
        throw new ApiError(400, "SessionId is required")
    }

    const cart = await Cart.findOne({ sessionId })

    if (!cart) {
        throw new ApiError(400, 'Cart not found')
    }
    res.status(201).json(new ApiResponse(200, cart.cartItems, 'CartItems sent succesfully'))

})


const updateCart = asyncHandler(async (req, res) => {
    const { sessionId, cartItems } = req.body;

    if (!sessionId || !Array.isArray(cartItems) || cartItems.length === 0) {
        throw new ApiError(400, 'sessionId and non-empty cartItems are required');
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
        throw new ApiError(400, 'Cart not found')
    }

    cart.cartItems = cartItems;
    await cart.save();

    res.status(201).json(new ApiResponse(200, cart, 'Cart updated successfully'))

})

const deleteCart = asyncHandler(async (req, res) => {

    const { sessionId, productId } = req.body;

    const cart = await Cart.findOne({ sessionId })

    if (!cart) {
        throw new ApiError(400, 'Cart not found')
    }
    cart.cartItems = cart.cartItems.filter(item => item.id != productId)

    await cart.save()
    res.status(200).json(new ApiResponse(200, cart, 'Cart deleted succesfully'))

})



module.exports = { addToCart, getCartItems, updateCart, deleteCart }