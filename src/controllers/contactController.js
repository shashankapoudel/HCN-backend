const Contact = require("../models/Contact");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const getContactDetails = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, message } = req.body;
    console.log(email)

    if (!firstName || !lastName || !email || !message) {
        throw new ApiError(400, 'All the fields are required')
    }

    const contact = await Contact.create({ firstName, lastName, email, message })
    return res.status(201).json(new ApiResponse(200, contact, 'New Contact added successfully'))
})


module.exports = { getContactDetails }