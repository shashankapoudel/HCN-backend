const Blog = require("../models/Blog");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const sendBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    const imageUrls = req.files.map((file) => file.path);
    if (!title || !content) {
        throw new ApiError(400, 'All fields are required')
    }
    const blog = new Blog({
        title,
        images: imageUrls,
        content
    })
    await blog.save()

    res.status(201).json(new ApiResponse(200, 'blog', 'Blog created successfully'))
})


const getBlog = asyncHandler(async (req, res) => {

    const blogs = await Blog.find();

    if (!blogs) {
        throw new ApiError(400, 'No Blogs found')
    }
    res.status(200).json(new ApiResponse(201, blogs, 'Blogs found and delivered'))
})

const updateBlog = asyncHandler(async (req, res) => {
    const { title, content, existingImages } = req.body;
    const { id } = req.params;
    let existing = [];
    if (existingImages) {
        if (Array.isArray(existingImages)) {
            existing = existingImages;
        } else {
            existing = [existingImages];
        }
    }
    const newImages = req.files?.map((file) => file.path) || [];
    const combinedImages = [...existing, ...newImages];
    const updated = await Blog.findByIdAndUpdate(
        id,
        {
            title,
            content,
            images: combinedImages,
        },
        { new: true }
    );
    res.status(200).json(new ApiResponse(201, updated, 'Blog updated successfully'))
})

const deleteBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id)

    if (!deleted) {
        throw new ApiError(400, 'Blog not found')
    }
    res.status(200).json(new ApiResponse(201, 'Blog deleted successfully'))
})




module.exports = { getBlog, sendBlog, updateBlog, deleteBlog }