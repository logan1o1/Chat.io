import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllUsers, getUsersForSidebar } from "../controllers/user.controller.js";


const userRouter = express.Router();

userRouter.get( "/", protectRoute, getUsersForSidebar);
userRouter.get("/all", getAllUsers)

export default userRouter;