import { Router } from "express";
import { register } from "../controllers/vendor.controller";

const router = Router();
router.post("/", register);



export default router;
