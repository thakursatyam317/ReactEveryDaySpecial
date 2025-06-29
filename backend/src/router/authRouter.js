import express from "express";
import { userLogin, userRegister, userLogout } from "../controllers/authUser.js";

const router = express.Router();

// Auth routes
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', userLogout);

export default router;
