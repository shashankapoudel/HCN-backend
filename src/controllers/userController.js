const generateToken = require("../config/generateToken");
const User = require("../models/User");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const ADMIN_USERNAME = 'himalayas123@admin'
const ADMIN_PASSWORD = 'himalayas123@'


const registerUser = asyncHandler(async (req, res) => {
    const { name, phone, email, country } = req.body;

    if (!emailRegex.test(email)) {
        throw new ApiError(400, 'Invalid email format');
    }

    if (!name || !email || !country) {
        throw new ApiError(400, 'Name,email and country fields need to be fulfilled')
    }

    const existedUser = User.findOne({ email, phone })
    if (existedUser) {
        throw new ApiError(400, 'User already exists')
    }

    const user = await User.create({ name, phone, email, country })
    return res.status(201).json(new ApiResponse(200, user, 'User registered successfully'))
})


const loginUser = asyncHandler(async (req, res) => {
    const { name, email, country } = req.body;

    if (!emailRegex.test(email)) {
        throw new ApiError(400, 'Invalid email format');
    }

    if (!name || !email || !country) {
        throw new ApiError(400, 'Name, email and country field is required')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, 'User with this email doesnot exist')
    }

    const token = generateToken(user._id)
    const loggedInUser = await User.findById(user._id)
    loggedInUser.token = token;

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200).cookie(options).json(new ApiResponse(200, {
        user: loggedInUser
    }, 'User logged in successfully'))

})


const adminLogin = asyncHandler(async (req, res) => {

    const { username, password } = req.body;
    console.log(username)

    if (!username || !password) {
        throw new ApiError(400, 'Both username and password required')
    }

    if (password === ADMIN_PASSWORD && username === ADMIN_USERNAME) {
        res.status(201).json(new ApiResponse(200, 'Admin recognition successfull'))
    } else {
        throw new ApiError(400, 'Admin not recognized')
    }
})

module.exports = { registerUser, loginUser, adminLogin }