import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCartItems,
  getCartItems,
  deleteCartItem,
  deleteCart
} from "../controllers/cartControl.js";

const router = express.Router();

router
  .route("/")
  .get(protect,getCartItems) 
  .post(protect, createCartItems);
router.route('/:id').delete(protect,deleteCartItem)
router.route('/delete').delete(protect,deleteCart)

export default router;
