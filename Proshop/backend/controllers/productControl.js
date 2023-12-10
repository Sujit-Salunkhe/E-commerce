import asyncHandler from "../middleware/asyncHandler.js";
import ProductModel from "../models/ProductModel.js ";
// @ decs  Fetch all products
// @route  GET/api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({});

  res.json(products);
});
// @ decs  Fetch a product
// @route  GET/api/products/:id
// @access Public
const getProductsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  // const product = products.find(p => p._id === Number(id))
  if (product) {
    return res.json(product);
  } else {
    res.status(404);

    throw new Error(`Resource Not Found `);
  }
});

export { getProducts, getProductsById };
