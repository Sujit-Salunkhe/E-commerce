import { json } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import UserModel from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/UserModel.js";


// @ decs  auth user & get the token
// @route  POST/api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const {email,password} = req.body
  const user = await UserModel.findOne({ email });
  // console.log(user)
  if (user && (await user.matchPassword(password))) {
    generateToken(res,user._id)
    res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
  })
  }else{
    res.status(401);
    throw new Error('Invalid Email Or Password');   
  }
});

// @ decs  Register User
// @route  POST/api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {name,email,password} = req.body
  const userExits = await UserModel.findOne({email});
  if(userExits){
    res.status(400);
    throw new Error('User already Exists')
  }
  const user =  await UserModel.create({
    name,
    email,
    password
  });
  if (user){
    generateToken(res,user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }) 
  }else {
    res.status(400);
    throw new Error('Invalid user data')
  }
});

// @ decs  Logout User / clear cookie
// @route  POST/api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt',"",{
      httpOnly:true,
      expires:new Date(0)
    });
    res.status(200).json({message:"Logged out Successfully"});
  });

// @ decs  get User profile  
// @route  GET/api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user){
      res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
      })
    } else {
      res.status(404)
      throw new Error ('User Not Found')
    }
  });

// @ decs  Update User profile  
// @route  PUT/api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id)
  if (user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password){
      user.password = req.body.password
    }
    const updatedUser = await user.save()  
    res.status(200).json({
      _id:  updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })} else {
      res.status(404)
      throw new Error ('User Not Found')
    }  
  });

// @ decs  Get user
// @route  GET/api/users
// @access private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('GET users ');
  });

// @ decs  Get user
// @route  GET/api/users
// @access private/Admin
const getUsersById = asyncHandler(async (req, res) => {
    res.send('get user by id ');
  });

// @ decs  Delete user
// @route  DELETE/api/users/:id
// @access private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
    res.send('delete users ');
  });

// @ decs  update user
// @route  PUT/api/users/:id
// @access private/Admin
const updateUsers = asyncHandler(async (req, res) => {
    res.send('update users ');
  });

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUsersById,
    updateUsers
}


