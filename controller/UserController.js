import User from "../model/User.js";
import bcrypt from 'bcrypt';

 //create user
 export const createUserController = async(req,res)=>{
    const {firstname,lastname,profilephoto,email,password} = req.body;
    try {
      //check if user has been registered b4
      const foundUser = await User.findOne({email});
        if(foundUser){
          res.json({
            status:"error",
            message:"User with that email already exists",
          })
        }
         //hash password
        else{
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(password, salt)
          const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
          })

          res.json({
            status:"success",
            data:user
          })
        }
          
    } catch (error) {
      res.json(error.message);
    }
  } 

  //display all user
export const displayAllController = async(req,res)=>{
    try {
      res.json({
          status:"success",
          data:"Display all users"
      })
    } catch (error) {
      res.json(error.message);
    }
  }
  //profile
  export const profileController  = async(req,res)=>{
    const userid =  req.params.id;
    try {
      res.json({
          status:"success",
          data:"get specific users: "+userid
      })
    } catch (error) {
      res.json(error.message);
    }
  }

  //update user

  export const updateUserController = async(req,res)=>{
    const userid =  req.params.id;
    try {
      res.json({
          status:"success",
          data:`User account updated successfully`
      })
    } catch (error) {
      res.json(error.message);
    }
  }

  //delete user
  export const deleteUserController  = async(req,res)=>{
    const userid =  req.params.id;
    try {
      res.json({
          status:"success",
          data:`User account deleted successfully`
      })
    } catch (error) {
      res.json(error.message);
    }
  }