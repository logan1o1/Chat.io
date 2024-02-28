import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const messageRouter = express.Router()

messageRouter.post('/send/:id', protectRoute, sendMessage)
messageRouter.get('/:id', protectRoute, getMessages); // protected route to get messages of a user

export default messageRouter;