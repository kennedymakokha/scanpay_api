"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_Mpesa_logs = exports.makePayment = exports.mpesa_callback = void 0;
const user_model_1 = require("../models/user.model");
const stk_util_1 = __importDefault(require("../utils/stk.util"));
const socket_1 = require("../config/socket");
const mpesa_logs_model_1 = __importDefault(require("../models/mpesa_logs.model"));
const simplefunctions_util_1 = require("../utils/simplefunctions.util");
const cash_model_1 = require("../models/cash.model");
let io = (0, socket_1.getSocketIo)();
const mpesa_callback = async (req, res) => {
    try {
        console.log('starting callback');
        const Logs = await mpesa_logs_model_1.default.find({
            MerchantRequestID: req.body.Body?.stkCallback?.MerchantRequestID
        });
        for (let i = 0; i < Logs.length; i++) {
            await mpesa_logs_model_1.default.findOneAndUpdate({
                _id: Logs[i]._id
            }, {
                log: JSON.stringify(req.body), ResultDesc: req.body.Body?.stkCallback?.ResultDesc,
                ResponseCode: req.body.Body?.stkCallback?.ResultCode,
                MpesaReceiptNumber: req.body.Body?.stkCallback?.CallbackMetadata?.Item[1]?.Value
            }, { new: true, useFindAndModify: false });
            if (req.body.Body?.stkCallback?.ResultCode === 0) {
                const agent = await cash_model_1.CashModel.findOne({ user: Logs.vendor });
                if (agent) {
                    let current = agent.Amount;
                    let newAmount = parseInt(current) + parseInt(Logs.amount);
                    await cash_model_1.CashModel.findOneAndUpdate({ user: Logs.vendor }, { amount: newAmount }, { new: true, useFindAndModify: false });
                    return;
                }
                else {
                    const newbusiness = new cash_model_1.CashModel({ user: agent._id, amount: Logs.amount });
                    await newbusiness.save();
                    return;
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ success: false, message: "operation failed ", error });
        return;
    }
};
exports.mpesa_callback = mpesa_callback;
const makePayment = async (req, res) => {
    try {
        const { amount, phone_number } = req.body;
        const user = await user_model_1.User.findById(req.user.userId);
        const agent = await user_model_1.User.findOne({ agent: req.body.to });
        let number;
        if (phone_number) {
            number = phone_number;
        }
        else {
            const user = await user_model_1.User.findById(req.user.userId);
            number = user?.phone_number;
        }
        const response = await (0, stk_util_1.default)(number, Number(amount), user._id, agent._id);
        const merchantRequestId = response.MerchantRequestID;
        let logs = await mpesa_logs_model_1.default.findOne({ MerchantRequestID: merchantRequestId });
        const maxRetries = 20;
        const retryInterval = 5000;
        let retryCount = 0;
        while (logs?.log === '' && retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying log fetch: attempt ${retryCount}`);
            await new Promise(resolve => setTimeout(resolve, retryInterval));
            logs = await mpesa_logs_model_1.default.findOne({ MerchantRequestID: merchantRequestId });
        }
        if (!logs || logs.log === '') {
            res.status(500).json({ message: "Payment not verified. Please try again later." });
            return;
        }
        console.log(logs);
        if (logs.ResponseCode !== 0) {
            res.status(400).json({ message: logs.ResultDesc });
            return;
        }
        else {
            res.status(200).json({ message: "Deposit successful" });
            return;
        }
    }
    catch (error) {
        console.error("Wallet operation error:", error);
        return res.status(400).json({
            success: false,
            message: "Operation failed",
            error: error?.message || error
        });
    }
};
exports.makePayment = makePayment;
const get_Mpesa_logs = async (req, res) => {
    try {
        const { page = 1, limit = 10, sendId } = req.query;
        let user = await user_model_1.User.findOne({ _id: req.user.userId });
        let phone = (0, simplefunctions_util_1.toLocalPhoneNumber)(user.phone_number);
        let logs = await mpesa_logs_model_1.default.find({ phone_number: phone }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        const total = await mpesa_logs_model_1.default.countDocuments();
        res.status(200)
            .json({
            logs, page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
        return;
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ success: false, message: "operation failed ", error });
        return;
    }
};
exports.get_Mpesa_logs = get_Mpesa_logs;
