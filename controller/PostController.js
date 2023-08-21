//create user

import mongoose from "mongoose";
import Post from "../model/Post.js";
import User from "../model/User.js";
import AppError from "../utils/AppError.js"

export const createPostController = async(req,res,next)=>{
    const {title,description,category}=req.body;
    try {
    const postOwner  = await User.findById(req.userAuth);
    
    } catch (error) {
      res.json(error.message);
    }
  } 