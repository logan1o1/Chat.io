import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

const protectRoute = async (req, resp, next) => {
    try {
        const token = req.cookies.access_token;

        if (!token) next(errorHandler(401, "Unauthorized"));

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) next(errorHandler(401, "Unauthorized"));

        const user = await  User.findById(decodedToken.userId).select("-password");

        if (!user) next(errorHandler(404, "User not found"));

        req.user = user;

        next();
    } catch (error) {
        next(error)
    }
}

export default protectRoute;