
import { Request, Response } from "express";


import Message from "../models/messages.model";
import { decryptMessage } from "../utils/encrypt.util";
import { Category } from "../models/category.model";
import { CustomError } from "../utils/custom_error.util";
import { validateCategoryInput } from "../validations/category.validation";



export const Create = async (req: Request, res: Response) => {
    try {
        CustomError(validateCategoryInput, req.body, res)
        const Exists: any = await Category.findOne({ category_name: req.body.category_name });
        if (Exists) {
            res.status(400).json("Category already Exists")
            return
        }
        const category: any = new Category(req.body);
        const newcategory = await category.save();
        res.status(201).json({ message: "admin added  successfully", newcategory });
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Get = async (req: Request | any, res: Response | any) => {
    try {
        const { page = 1, limit = 10, sendId } = req.query;
        const Categories: any = await Category.find({ deletedAt: null }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await Category.countDocuments();
        res.status(201).json(
            {
                Categories, page: parseInt(page),
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
        const Category_obj: any = await Category.findById(id)
        res.status(201).json(Category_obj);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Update = async (req: Request | any, res: Response | any) => {
    try {
        let updates: any = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        res.status(200).json(updates._id)
        return
    } catch (error) {
        res.status(400).json(error)
        return
    }
};
export const Trash = async (req: Request | any, res: Response | any) => {
    try {
        let deleted: any = await Category.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json(`${deleted.category_name} deleted successfully`)
        return
    } catch (error) {
        res.status(404).json(error);

        return
        throw new Error("deletion Failed ")
    }
};

