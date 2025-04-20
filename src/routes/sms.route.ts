import { Router } from "express";

import { sendSms } from "../controllers/smsendpoint.controller";


const router = Router();

router.post("/", sendSms);






export default router;
