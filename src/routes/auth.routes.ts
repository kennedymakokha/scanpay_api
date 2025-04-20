import { Router } from "express";
import { register, login, logout, refresh, session_Check, updatePassword, activateuser, requestToken, verifyuser, get_Users, registerAdmin, admin_login, get_Admins } from "../controllers/auth.controller";

const router = Router();
/**
 * @swagger
 * /api/auth/register:
 *   get:
 *     summary: register  a new user
 *     responses:
 *       200:
 *         description: register User
 */
router.post("/register", register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login user
 *     responses:
 *       200:
 *         description: login User
 */
router.post("/login", login);
/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: return authenticated User
 *     responses:
 *       200:
 *         description: return logged in user
 */
router.get("/", session_Check);
router.post("/refresh", refresh);
router.post("/reset-password", updatePassword);
/**
 * @swagger
 * /api/auth/reset-password:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.post("/activate-user", activateuser);
router.post("/verify-otp", verifyuser);
router.post("/request-otp", requestToken);
router.post("/logout", logout);

// admin
router.post("/admin-register", registerAdmin);
router.post("/admin-login", admin_login);
router.get("/admin/users", get_Users);
router.get("/admin/users/admins", get_Admins);


export default router;
