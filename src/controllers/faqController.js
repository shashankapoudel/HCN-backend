const Faq = require("../models/Faq");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const storeFaq = asyncHandler(async (req, res) => {

    const { category, question, answer } = req.body;

    if (!category || !question || !answer) {
        throw new ApiError(400, 'All fields are required')
    }

    const faq = new Faq({
        category,
        question,
        answer
    })
    await faq.save()
    res.status(201).json(new ApiResponse(200, faq, 'New Faq saved successfully'))

})


const sendFaq = asyncHandler(async (req, res) => {

    const faq = await Faq.find()
    res.status(200).json(new ApiResponse(200, faq, 'Faq sent successfully'))

})


const deleteFaq = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const deleted = await Faq.findByIdAndDelete({ id })
    if (!deleted) {
        throw new ApiError(400, 'Faq not found')
    }
    res.status(200).json(new ApiResponse(200, 'Faq deleted successfully'))

})



const updateFaq = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { category, question, answer } = req.body;

    const updated = await Faq.findByIdAndUpdate(id, { category, question, answer }, { new: true })

    if (!updated) {
        throw new ApiError(400, 'Faq not found')

    }
    res.status(200).json(new ApiResponse(201, 'Faq updated successfully'))

})


module.exports = { storeFaq, sendFaq, deleteFaq, updateFaq }