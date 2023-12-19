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
// @ decs  update a products
// @route  PUT/api/products/:id
// @access private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product) {
    await Product.deleteOne({_id:product._id})
    res.status(200).json({message:'Product deleted'})
  }else{
    res.status(404)
    throw new Error("Product is Not found")
  }
});
// @ decs  delete a products
// @route  DELETE/api/products/:id
// @access private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock
  } = req.body
  
  const product = await Product.findById(req.params.id)
  if(product) {
    product.name = name,
    product.price = price,
    product.description = description,
    product.image = image,
    product.brand = brand,
    product.category = category,
    product.countInStock = countInStock;

    const newProduct = await product.save();
    res.status(201).json(newProduct)
  }else{
    res.status(404)
    throw new Error("Product is Not found")
  }
});

export { getProducts, getProductsById,createProduct,updateProduct,deleteProduct };
