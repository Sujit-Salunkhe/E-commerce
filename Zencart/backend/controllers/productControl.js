import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js ";

// @ decs  Fetch all products
// @route  GET/api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGE_SIZE
  const page = Number(req.query.pageNumber || 1)
  const keyword = req.query.keyword ? {name :{$regex : req.query.keyword, $options:'i'}} : {}
  const count = await Product.countDocuments({...keyword});
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
  res.status(201).json({products,page,pages:Math.ceil(count/pageSize)});
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
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const newProduct = await product.save();
  res.status(201).json(newProduct);
});
// @ decs  update a products
// @route  PUT/api/products/:id
// @access private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    (product.name = name),
      (product.price = price),
      (product.description = description),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock);

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } else {
    res.status(404);
    throw new Error("Product is Not found");
  }
});
// @ decs  delete a products
// @route  Delete/api/products/:id
// @access private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product is Not found");
  }
});
// @ decs  Create a new review
// @route  Post/api/products/:id/reviews
// @access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed")
    };
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    console.log('save')
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product is Not found");
  }
});

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview
};
