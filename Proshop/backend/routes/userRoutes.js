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
const router = express.Router();
router.route('/').get(getUsers).post(registerUser);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/:id').delete(deleteUsers).get(getUsersById).put(updateUsers)


export default router