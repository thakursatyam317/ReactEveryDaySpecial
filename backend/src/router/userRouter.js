
import express from "express";
import { userProfile, updateUserProfile } from "../controllers/userController.js";
import { userProtect } from "../middleware/authMiddleware.js";

import multer from "multer";

const upload = multer();

const router = express.Router();

router.get("/profile", userProtect, userProfile);

router.put("/update", userProtect, upload.single("profilePic"), updateUserProfile);


//router.put("/update", userProtect, upload.single("photo"), updateUser);


export default router;