import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import {
    getUserData,
    loginController,
    logoutController,
    onboardingController,
    signupController
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", isAuth, logoutController);
authRouter.get("/getUserData", isAuth, getUserData);
authRouter.post("/onboarding", isAuth, onboardingController);

export default authRouter;