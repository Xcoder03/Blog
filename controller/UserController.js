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
export const displayAllUsers = async(req,res)=>{
    try {
      const users = await User.find({})
      if(users){
        res.json({
          status:"success",
          data:users
       })
      }
     
    } catch (error) {
      res.json(error.message);
    }
  }
  //profile
  export const profileController  = async(req,res)=>{
    const userid =  req.params.id;
    try {
      const foundUser  =  await User.findById(userid);
      if(!foundUser){
        return res.json({
          status:"error",
          message:"No user associated with that Id",
        })
      }


      res.json({
          status:"success",
          data:foundUser
      })
    } catch (error) {
      res.json(error.message);
    }
  }


  // login User
export const loginUser = async(req, res) =>{
  const {email, password} = req.body
      try{
        const Isuserfound = await User.findOne({email})
        if(!Isuserfound){
          return res.json({message: "Wrong email or password"})
        }
        // get password

        const isPasswordCorrect  = await bcrypt.compare(password,Isuserfound.password)
        if(isPasswordCorrect){
          return res.json({message: "Wrong email or password"})
        }

        res.json({
          status: "success",
          data: Isuserfound,
        })
      }catch(err){
        res.json(err.message)
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