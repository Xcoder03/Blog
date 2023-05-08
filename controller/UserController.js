import User from "../model/User.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";
import { obtainToken } from "../utils/obtainToken.js";
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
    try {
      const token= obtainToken(req)
      const foundUser  =  await User.findById(req.userAuth);
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
          return res.json({message: "Wrong email"})
        }
        // get password

        const isPasswordCorrect  = await bcrypt.compare(password,Isuserfound.password)
        if(!isPasswordCorrect){
          return res.json({message: "Wrong email or password"})
        }

        request.json({
          status: "success",
          data: {
            firstname: Isuserfound.firstname,
            lastname: Isuserfound.lastname,
            email: Isuserfound.email,
            token: generateToken(Isuserfound._id)
          }
        })
      }
      catch(err){
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

      const userDeleted = await User.findByIdAndDelete(userid)
      if(userDeleted){
        res.json({
          status:"success",
          data:`User account deleted successfully`
      })

      }
    
    } catch (error) {
      res.json(error.message);
    }
  }

  export const followUser = async(req, res) =>{
    try {
          //find user to follow
        const userToFollow = await User.findById(req.params.id);
    // console.log(userToFollow);
    const userWhoIsFollowing = await User.findById(req.userAuth);
    if(userToFollow && userWhoIsFollowing){
      const userAlreadyFollowed = userToFollow.followers.find(
        (follower) => follower.toString() === userWhoIsFollowing._id.toString()
      )

      
      if (userAlreadyFollowed) {
        return res.json({
          status: "error",
          message: "You have previously followed this user",
        });

      }else{
           //push user that followed to the user follower array
           userToFollow.followers.push(userWhoIsFollowing._id);
           //push that is following
           userWhoIsFollowing.following.push(userToFollow._id);


           await userToFollow.save();
           await userwhoisfollowing.save();

           res.json({
            status: "success",
            data: "You have successfuly following this user",
          });
      } 
    }

      
    } catch (error) {
      res.json(error.message);
    }

  }


  // user to unfollow

  export const unfollowUser = async(req,res) =>{
    try {
      //get the user to unfollow

    const userToUnFollow = await User.findById(req.params.id);
    // console.log(userToUnFollow);

    //get the id of the user that want to unfollow another user

    const userThatWantToUnFollow = await User.findById(req.userAuth);
      if(userToUnFollow && userThatWantToUnFollow){
              //check if userwho to unfollowe is already in the user follower array

        
      const isUserAlreadyUnfollowed = userToUnFollow.followers.find(
        (follower) =>
          follower.toString() === userThatWantToUnFollow._id.toString()
        );

        if (!isUserAlreadyUnfollowed) {
          res.json({
            status: "error",
            message: "You have not followed this user",
          });
        }else {
          //remove the user who unfollow from the follower's array
          userToUnFollow.followers = userToUnFollow.followers.filter(
            (follower) =>
              follower.toString() !== userThatWantToUnFollow._id.toString()
          );

          
        await userToUnFollow.save();
        //remove user to be unfollowed from the user who is following array
        userThatWantToUnFollow.following =
          userThatWantToUnFollow.following.filter(
            (following) =>
              following.toString() !== userToUnFollow._id.toString()
          );
          await userthatwanttounfollow.save();

          res.json({
            status: "success",
            data: "You have successfully unfollow this user",
          });

        }

      }
    } catch (error) {
      res.json(error.message);
    }
  }