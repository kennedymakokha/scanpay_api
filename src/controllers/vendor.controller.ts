import { Request, Response } from "express";
import { User } from "../models/user.model";

import { Format_phone_number } from "../utils/simplefunctions.util";
import { sendTextMessage } from "../utils/sms_sender.util";
import { MakeActivationCode } from "../utils/generate_activation.util";
import { CustomError } from "../utils/custom_error.util";
import { validateVendorInput } from "../validations/user.validation";


// User Registration

export const register = async (req: Request, res: Response) => {
    try {
        CustomError(validateVendorInput, req.body, res)
        const { username, password, phone_number } = req.body;
        let phone = await Format_phone_number(phone_number);
        req.body.location = {
            lat: req.body.lat,
            lng: req.body.lng
        }
        const userExists: any = await User.findOne(
            {
                $or: [
                    { username: phone_number },
                    { phone_number: phone }
                ],

            }
        );

        if (userExists) {
            res.status(400).json("User already exists")
            return
        }
        let activationcode = MakeActivationCode(4)
        req.body.role = "admin"
        req.body.phone_number = phone
        req.body.activationCode = activationcode
        const user: any = new User(req.body);
        const newUser = await user.save();

        await sendTextMessage(
            `Hi ${newUser.vendorName} \nWelcome to Scan pay\nYour your activation Code is ${activationcode}`,
            `${phone}`,
            newUser._id,
            "account-activation"
        )
        res.status(201).json({ ok: true, message: "User registered successfully", newUser });
        return;

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};

