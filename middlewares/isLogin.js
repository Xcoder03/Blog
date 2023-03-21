import { obtainToken } from "../utils/obtainToken";
import { verifyToken } from "../utils/verifyToken";

export const isLogin = (req, res,next)=>{
    //get token header
   const token = obtainToken(req);
   //verify
 
   const userDeCoded  = verifyToken(token);
 
   req.userAuth = userDeCoded.id;
 
   if(!userDeCoded){
     return res.json({
         status:"error",
         message:"Kindly login in, because it seems the token is either expired or invalid"
     })
   }else{
     next()
   }
    
 }