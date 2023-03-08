import express from 'express'
import { createUserController, deleteUserController, displayAllController, profileController, updateUserController } from '../controller/usersControllers.js';

const userRoutes = express.Router();

//create user
userRoutes.post("/create", createUserController);
//get users
userRoutes.get("",displayAllController);
//profile
userRoutes.get("/:id",profileController);
//delete user
userRoutes.delete("/:id",deleteUserController);
//update user
//delete user
userRoutes.put("/:id",updateUserController);