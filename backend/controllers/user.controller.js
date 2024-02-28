import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, resp, next) => {
    try {
        const loggedinUserId = req.user._id;

        const filteredUsers = await User.find({_id: {$ne: loggedinUserId}}).select("-password");

        resp.status(200).json(filteredUsers);
    } catch (error) {
        next(error)
    }
}