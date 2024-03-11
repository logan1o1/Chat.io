import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { errorHandler } from "../utils/error.js";


export const sendMessage = async (req, resp, next) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        });  //Find the common user between them

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);   //Adding a new message to the conversation's messages array
        }

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]); 

        const receiverSocketId = getReceiverSocketId(recieverId);

        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        resp.status(201).json(newMessage);
    } catch (error) {
        next(error);
    }
}

export const getMessages = async (req, resp, next) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return resp.status(200).json([]);

		const messages = conversation.messages;

		resp.status(200).json(messages);
    } catch (error) {
        next(error)
    }
}