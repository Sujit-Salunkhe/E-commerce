import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js ";

// @ decs  Fetch all products
// @route  GET/api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});
// @ decs  Fetch a product
// @route  GET/api/products/:id
// @access Public
const getProductsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  // const product = products.find(p => p._id === Number(id))
  if (product) {
    return res.json(product);
  } else {
    res.status(404);

    throw new Error(`Resource Not Found `);
  }
});
// @ decs  create a Product
// @route  post/api/products
// @access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product ({
    name:'Sample Name',
    price:0,
    user:req.user._id,
    image:'/images/sample.jpg',
    brand:'Sample Brand',
    category:'Sample Category',
    countInStock:0,
    numReviews:0,
    description:'Sample Description',
    
  })
  const newProduct = await product.save()
  res.status(201).json(newProduct); 
});

export { getProducts, getProductsById,createProduct };
