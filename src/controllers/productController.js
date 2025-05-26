const Product = require("../models/Product");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const addProducts = asyncHandler(async (req, res) => {
    const { name, category, subcategory, size, stock, material, sound, price, description, overview, weight } = req.body; //
    const imageUrls = req.files.map((file) => file.path);
    console.log(imageUrls)

    if (!category || !subcategory || !size || !material || !price || imageUrls.length === 0) {
        throw new ApiError(400, 'All fields are required, including images');
    }

    const newProduct = new Product({
        name,
        category,
        subcategory,
        subcategorycategory,
        size,
        material,
        stock,
        size,
        sound,
        price,
        images: imageUrls,
        description,
        overview,
        weight
    });
    console.log(newProduct)
    await newProduct.save();

    return res.status(201).json(new ApiResponse(200, newProduct, 'New product saved successfully'));
});


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    );
});



const getProductsByCategory = asyncHandler(async (req, res) => {

    const { category } = req.params;

    const products = await Product.find({ category })

    res.status(400).json(new ApiResponse(200, products, 'Products fetched successfully'))
})


const getSingleProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;


    const product = await Product.findById(id)


    if (!product) {
        throw new ApiError(400, 'Product Not Found')
    }

    res.status(200).json(new ApiResponse(200, product, 'Product sent successfully'))
})


module.exports = { addProducts, getProducts, getProductsByCategory, getSingleProduct }
