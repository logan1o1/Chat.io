import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { deleteUser, getUsersForSidebar, updateUserDetails } from "../controllers/user.controller.js";


const userRouter = express.Router();

userRouter.get( "/", protectRoute, getUsersForSidebar);
userRouter.put("/update/:id", protectRoute, updateUserDetails);
userRouter.delete("/delete/:id", protectRoute, deleteUser);


export default userRouter;