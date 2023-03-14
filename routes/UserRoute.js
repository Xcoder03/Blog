import express from 'express'
import { createUserController, deleteUserController, displayAllUsers, profileController, updateUserController,loginUser } from '../controller/UserController.js';

const userRoutes = express.Router();

//create user
userRoutes.post("/create", createUserController);
//get users
userRoutes.get("",displayAllUsers);
userRoutes.post("/login",loginUser)
//profile
userRoutes.get("/:id",profileController);
//delete user
userRoutes.delete("/:id",deleteUserController);
//update user
//delete user
userRoutes.put("/:id",updateUserController);

export default userRoutes;