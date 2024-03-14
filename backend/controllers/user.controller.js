import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";


export const getUsersForSidebar = async (req, resp, next) => {
    try {
        const loggedinUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedinUserId } }).select("-password");

        resp.status(200).json(filteredUsers);
    } catch (error) {
        next(error)
    }
}


export const updateUserDetails = async (req, resp, next) => {
    try {
        if (req.body.password) {
            const hashedPassword = bcrypt.hashSync(req.body.password, 5);

            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    fullName: req.body.fullName,
                    username: req.body.username,
                    password: hashedPassword,
                    gender: req.body.gender,
                },
            },
            {new: true})

            const { password, ...others } = updateUser._doc;

            resp.status(200).json(others);
        } else {
            next(errorHandler(400, 'Please fill the password field'));
        }
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, resp, next) => {
    if (req.user.id !== req.params.id) next(errorHandler(401, "you can only delete your own account"));
    try {
        await User.findByIdAndDelete(req.params.id);
        resp.status(204).clearCookie("access_token").json("User deleted...");
    } catch (error) {
        next(error)
    }
}
