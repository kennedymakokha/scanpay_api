
import { Request, Response } from "express";


import { sendTextMessage } from "../utils/sms_sender.util";


export const sendSms = async (req: Request | any, res: Response | any) => {

    const { message, phone, reciever, ref } = req.body;
    try {
        let response = await sendTextMessage(message, phone, reciever, ref)

        if (response.success) {
            res.status(200).json(response.data);
            return
        }
        else {
            res.status(400).json(response.data);
            return
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error
        });
        return
    }
  
}