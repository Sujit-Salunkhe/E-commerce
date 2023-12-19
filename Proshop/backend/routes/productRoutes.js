import  express  from "express";
// import products from '../data/products.js'
import { getProducts,getProductsById,createProduct,updateProduct ,deleteProduct} from "../controllers/productControl.js";
import { protect,admin } from '../middleware/authMiddleware.js'
const router = express.Router();

router.route('/').get(getProducts).post(protect,admin,createProduct);

router.route('/:id').get(getProductsById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct)

export default router