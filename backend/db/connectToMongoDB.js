import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("conected to mongodb");
    } catch (error) {
        console.log("Unable to connect to database", error.message);
    }
}

export default connectToMongoDB;