import asyncHandler from "../middleware/asyncHandler.js";
import Cart from '../models/cartModel.js'

// @ decs create cart Items
// @route  Post/api/cart
// @access Private

const createCartItems = asyncHandler(async(req,res) => {
    
    const cart = await Cart.findOne({user:req.user._id})
    console.log(cart)
    if(cart){
        // console.log(req.body.cartItems)
        cart.cartItems.push(req.body.cartItem.map((x) =>({
            ...x,
            _id:undefined,
            product:x._id
        })))
        await cart.save()
    }else{
        const newCart = new Cart({
            user:req.user._id,
            cartItems:req.body.cartItems.map((x) => ({
             ...x,
             _id:undefined,
             product:x._id
        })),
        })
        await newCart.save()
    }
    res.status(200).json({message:'Cart created Successfully'})
    
})

// @ decs get all cart
// @route  get/api/cart
// @access Private

const getCartItems = asyncHandler(async (req,res) => {
    // const cart = await Cart.findById(req.user._id);
    // if(cart){
    //     res.status(202).json(cart)
    // }else{
    //     res.status(404)
    //     throw new Error ('Cart is not found')
    // }
    console.log('create cart items')
    
})

// @ decs delete all cart
// @route  delete/api/cart
// @access Private
const deleteCartItems = asyncHandler(async(req,res) => {
        console.log("deleteCartItems")
})

export {
    createCartItems,
    getCartItems,
    deleteCartItems
}   


