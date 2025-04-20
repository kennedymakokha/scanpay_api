
import { Socket } from "socket.io";
import { MakeActivationCode } from "../utils/generate_activation.util";
import { ChatMessage } from "../types";
import Message from "../models/messages.model";
import { encryptMessage } from "../utils/encrypt.util";

let io: any = null;
let users: { [key: string]: string } = {};
export const setupSocket = (socketInstance: any) => {
    io = socketInstance;
    io.on("connection", (socket: any) => {
        console.log("SOCKET CONNECTION MADE:", socket.id);
       

        socket.on('join_topic', (topic: any) => {
            socket.join(topic);
            console.log(`User ${socket.id} joined topic: ${topic}`);

            // Optional: Notify others in the room
            socket.to(topic).emit('user_joined', {
                message: `User ${socket.id} has joined the topic ${topic}`,
            });
        });

        socket.on('send_message', ({ topic, message }: any) => {
            io.to(topic).emit('receive_message', {
                sender: socket.id,
                message,
            });
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

    });





 
};
export const getSocketIo = () => io;
