import { Router } from "express";
import { get_Mpesa_logs, makePayment, mpesa_callback } from "../controllers/stk.ontrollers";
import { authenticateToken } from "../middleware/auth.middleware";


const router = Router();
router.post("/pay", authenticateToken, makePayment);
router.post("/mpesa-callback", mpesa_callback);
router.get("/mpesa-logs",authenticateToken, get_Mpesa_logs);
export default router;
