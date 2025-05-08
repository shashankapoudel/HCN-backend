const Blog = require("../models/Blog");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const getBlog = asyncHandler(async (req, res) => {

    const { title, content } = req.body;

    if (!title || !content) {
        throw new ApiError(400, 'All fields are required')
    }

    const blog = new Blog({
        title,
        content
    })

    await blog.save()

    res.status(201).json(new ApiResponse(200, 'blog', 'Blog created successfully'))
})
module.exports = { getBlog }