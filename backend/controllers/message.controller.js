import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";


export const sendMessage = async (req, resp, next) => {
    try {
        const {message} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all: [senderId, recieverId]} 
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

        // await conversation.save()
        // await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()]); // this will run in parallel

        resp.status(201).json(newMessage);
    } catch (error) {
        next(error);
    }
}

export const getMessages = async (req, resp, next) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages");

        if (!conversation) resp.status(200).json([]);

        const messages = conversation.messages;

        resp.status(200).json(messages);
    } catch (error) {
        next(error)
    }
}