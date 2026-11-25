
import { Router } from "express";

import {
    logoutUser,
    registerUser,
    loginUser,refreshAccessToken
} from "../controllers/user.controllers.js";
 
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Register route
router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

// Login route
router.route("/login").post(loginUser);

// Secured logout route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken)

export default router;
