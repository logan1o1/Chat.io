import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, resp, next) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return next(errorHandler(400, "Passwords don't match"))
        }

        const user = await User.findOne({username});

        if (user) next(errorHandler(400, "User already exists"));

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const  newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, resp);
            await newUser.save();

            resp.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                gender: newUser.gender,
            }); 
        }else{
            next(errorHandler(400, "Invalid user data"))
        }

    } catch (error) {
        next(error)
    }
}


export const login = async (req, resp, next) => {
    try {
        const {username, password} = req.body;
        const  user = await User.findOne({username});
        const isCorrectPassword = await bcrypt.compare(password, user?.password || "");
        
        if (!user || !isCorrectPassword) return next(errorHandler(400, 'Invalid credentials'));

        generateTokenAndSetCookie(user.id, resp);

        resp.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            gender: user.gender,
        })
    } catch (error) {
        next(error)
    }
}


export const logout = async (req, resp, next) => {
    try {
        resp.clearCookie("access_token");
        resp.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        next(error)
    }
}