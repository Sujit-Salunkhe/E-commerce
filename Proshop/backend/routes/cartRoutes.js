import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCartItems,
  getCartItems,
  deleteCartItems,
} from "../controllers/cartControl.js";

const router = express.Router();

router
  .route("/")
  .get(protect,getCartItems) 
  .post(protect, createCartItems);
router.route('/:id').delete(protect,deleteCartItems)

export default router;
