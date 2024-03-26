import  express  from "express";
// import products from '../data/products.js'
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUsersById,
    updateUsers } from "../controllers/userControl.js";
import {protect,admin} from "../middleware/authMiddleware.js"
const router = express.Router();
router.route('/').get(protect,admin,getUsers).post(registerUser);
router.post('/logout',logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUsers).get(protect,admin,getUsersById).put(protect,admin,updateUsers)


export default router