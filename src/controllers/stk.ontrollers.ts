import { User } from "../models/user.model";
import { Request, Response } from "express";
import Mpesa_stk from "../utils/stk.util";
import { getSocketIo } from "../config/socket";
import MpesaLogs from "../models/mpesa_logs.model";
import { toLocalPhoneNumber } from "../utils/simplefunctions.util";
import { CashModel } from "../models/cash.model";
let io = getSocketIo()


export const mpesa_callback = async (req: Request | any, res: Response | any) => {
    try {
   
        const Logs = await MpesaLogs.find({
            MerchantRequestID: req.body.Body?.stkCallback?.MerchantRequestID
        })
     
        for (let i = 0; i < Logs.length; i++) {

            await MpesaLogs.findOneAndUpdate(
                {
                    _id: Logs[i]._id
                }, {
                log: JSON.stringify(req.body), ResultDesc: req.body.Body?.stkCallback?.ResultDesc,
                ResponseCode: req.body.Body?.stkCallback?.ResultCode,
                MpesaReceiptNumber: req.body.Body?.stkCallback?.CallbackMetadata?.Item[1]?.Value
            }, { new: true, useFindAndModify: false })

            if (req.body.Body?.stkCallback?.ResultCode === 0) {

                const agent: any = await CashModel.findOne({ user: Logs.vendor })
              
                if (agent) {
                    let current = agent.Amount
                    let newAmount = parseInt(current) + parseInt(Logs.amount)
                    await CashModel.findOneAndUpdate({ user: Logs.vendor }, { amount: newAmount }, { new: true, useFindAndModify: false })
                    return
                } else {
                    const newbusiness: any = new CashModel({ user: Logs.vendor, amount: Logs.amount });
                    await newbusiness.save();
                    return
                }

            }
        }
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ success: false, message: "operation failed ", error });
        return
    }
}
export const makePayment = async (req: Request | any, res: Response | any) => {
    try {
        const { amount, phone_number } = req.body;
        const user: any = await User.findById(req.user.userId)
        const agent: any = await User.findOne({ agent: req.body.to })

        let number
        if (phone_number) {
            number = phone_number
        }
        else {
            const user = await User.findById(req.user.userId)
            number = user?.phone_number
        }
        const response = await Mpesa_stk(number, Number(amount), user._id, agent._id);
        const merchantRequestId = response.MerchantRequestID;

        let logs = await MpesaLogs.findOne({ MerchantRequestID: merchantRequestId });
        const maxRetries = 20;
        const retryInterval = 5000;
        let retryCount = 0;

        while (logs?.log === '' && retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying log fetch: attempt ${retryCount}`);
            await new Promise(resolve => setTimeout(resolve, retryInterval));
            logs = await MpesaLogs.findOne({ MerchantRequestID: merchantRequestId });
        }

        if (!logs || logs.log === '') {
            res.status(500).json({ message: "Payment not verified. Please try again later." });
            return
        }
        console.log(logs)
        if (logs.ResponseCode !== 0) {
            res.status(400).json({ message: logs.ResultDesc });
            return
        } else {

            res.status(200).json({ message: "Deposit successful" });
            return
        }





    } catch (error: any) {
        console.error("Wallet operation error:", error);
        return res.status(400).json({
            success: false,
            message: "Operation failed",
            error: error?.message || error
        });
    }
};

export const get_Mpesa_logs = async (req: Request | any, res: Response | any) => {
    try {
        const { page = 1, limit = 10, sendId } = req.query;
        let user: any = await User.findOne({ _id: req.user.userId })
        let phone = toLocalPhoneNumber(user.phone_number)
        let logs = await MpesaLogs.find({ phone_number: phone }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await MpesaLogs.countDocuments();
        res.status(200)
            .json({
                logs, page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            });
        return
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ success: false, message: "operation failed ", error });
        return
    }
}
