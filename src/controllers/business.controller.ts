
import { Request, Response } from "express";

import { CustomError } from "../utils/custom_error.util";
import { validateBusinessInput } from "../validations/busniness.validation";
import { BusinessModel } from "../models/business.model";



export const Create = async (req: Request | any, res: Response) => {
    try {

        CustomError(validateBusinessInput, req.body, res)
        const Exists: any = await BusinessModel.findOne({ Business_name: req.body.business_name });
        if (Exists) {
            res.status(400).json("Business already Exists")
            return
        }
        req.body.createdBy = req.user.userId
        const newbusiness: any = new BusinessModel(req.body);
        const newBusiness = await newbusiness.save();
        res.status(201).json({ message: "admin added  successfully", newBusiness });
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Get = async (req: Request | any, res: Response | any) => {
    try {
        console.log("first")
        const { page = 1, limit = 10, sendId } = req.query;
        const businessess: any = await BusinessModel.find({ deletedAt: null }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await BusinessModel.countDocuments();
        res.status(201).json(
            {
                businessess, page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            }
        );
        return; return
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Get_one = async (req: Request | any, res: Response | any) => {
    try {
        const { id } = req.query;
        const Business_obj: any = await BusinessModel.findById(id)
        res.status(201).json(Business_obj);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Update = async (req: Request | any, res: Response | any) => {
    try {
        let updates: any = await BusinessModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        res.status(200).json(updates._id)
        return
    } catch (error) {
        res.status(400).json(error)
        return
    }
};
export const Trash = async (req: Request | any, res: Response | any) => {
    try {
        let deleted: any = await BusinessModel.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json(`${deleted.Business_name} deleted successfully`)
        return
    } catch (error) {
        res.status(404).json(error);

        return
        throw new Error("deletion Failed ")
    }
};

