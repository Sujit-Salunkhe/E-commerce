import express from "express";
import {addBrandSales } from '../controllers/salesControl.js'
const router = express.Router()
router.route('/').post(addBrandSales)

export default router