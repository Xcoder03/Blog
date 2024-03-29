import User from "../model/UserModel.js";
import AppError from "../utils/AppErr.js";
import { obtainTokenFromHeader } from "../utils/obtaintokenfromheader.js";
import { verifyToken } from "../utils/verifytoken.js";

export const isAdmin = async (req, res, next) => {
  //get token header
  const token = obtainTokenFromHeader(req);
  //verify

  const userDeCoded = verifyToken(token);

  req.userAuth = userDeCoded.id;

  //find the user from database
  const user = await User.findById(userDeCoded.id);
  //check if the user is an admin

  if (user.isAdmin) {
    return next();
  } else {
    return next(AppError("Access Denied",403)) 
    
  }
};