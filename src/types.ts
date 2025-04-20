import { Document } from "mongoose";
import { Types } from "mongoose";

export interface ChatMessage {
    userId: string;
    socketId: string
    username: string;
    from?: string;
    toId?: string
    message: string;
}

export interface IMessage extends Document {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    message: string;
    socketId: string;
    timestamp: Date;
    type: "user" | "system";
}

export interface ISms extends Document {

    receiver: Types.ObjectId;
    message: string;
    status_code: string;
    status_desc: string;
    message_id: string;
    ref: "account-activation" | "password-reset"
    timestamp: Date;

}

export type Category = {
    category_name: string;
    description: string;
    state: "active" | "inactive";
    deletedAt?: string;
    createdBy: Types.ObjectId;
};