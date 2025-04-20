import { Router } from "express";
import { get_single_conversation } from "../controllers/message.controller";
import { Create, Get, Get_one, Trash, Update } from "../controllers/category.controller";


const router = Router();


router.get("/", Get);
router.post("/", Create);
router.put("/:id", Update);
router.delete("/:id", Trash);
router.get("/:id", Get_one);


export default router;
