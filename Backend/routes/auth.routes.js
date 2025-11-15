import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import {
    getUserData,
    loginController,
    logoutController,
    onboardingController,
    signupController
} from '../controllers/auth.controller.js';
import { updateProfileController } from '../controllers/user.controller.js';

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", isAuth, logoutController);
authRouter.get("/getUserData", isAuth, getUserData);
authRouter.post("/onboarding", isAuth, onboardingController);
authRouter.put("/update-profile", isAuth, updateProfileController);

// check if user is logged in 
authRouter.get("/me", isAuth, (req, res) => {
    res.status(200).json({success: true, user: req.user});
});

export default authRouter;