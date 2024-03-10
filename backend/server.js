import express from 'express';
import  dotenv  from 'dotenv';
import authRouter from './routes/auth.route.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import { app, server } from './socket/socket.js';


dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)
app.use('/api/users', userRouter)


app.use((err, req, resp, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return resp.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});