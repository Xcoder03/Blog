//create user

import mongoose from "mongoose";
import Post from "../model/Post.js";
import User from "../model/User.js";

export const createPostController = async(req,res)=>{
    const {title,description,category}=req.body;
    try {
      res.json({
       
      })
    } catch (error) {
      res.json(error.message);
    }
  } 