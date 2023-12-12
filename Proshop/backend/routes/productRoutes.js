import  express  from "express";
// import products from '../data/products.js'
import { getProducts,getProductsById } from "../controllers/productControl.js";
const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductsById);

export default router