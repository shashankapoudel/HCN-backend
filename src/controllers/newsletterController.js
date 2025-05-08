const Newsletter = require("../models/Newsletter");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");


// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const getInfo = asyncHandler(async (req, res) => {

    const { email } = req.body;

    const existedNewsletter = await Newsletter.findOne({ email })

    if (existedNewsletter) {
        throw new ApiError(400, 'User has already subscribed to our newsletter')
    }

    const newsletter = await Newsletter.create({ email })
    res.status(201).json(new ApiResponse(200, newsletter, 'User subscibed to newsletter successfully'))
})
module.exports = { getInfo }