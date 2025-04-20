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

export type Business = {
    business_name: string;
    description: string;
    state: "active" | "inactive";
    deletedAt?: string;
    createdBy: Types.ObjectId;
};
export type User = {
    phone_number: string;
    password: string;
    username: string;
    vendorName?: string;
    fullname?: string
    role: "active" | "inactive";
    deletedAt?: string;
    ID_No: string
    business?: Types.ObjectId | any;
    createdBy?: Types.ObjectId;
    bussines?: Types.ObjectId;
    confirm_password?: string
};