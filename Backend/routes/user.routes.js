import express from 'express';
import {
    accpetFriendRequest,
    getAllFriendRequests,
    getAllOutgoingFriendRequests,
    getMyFriends,
    getRecommendedUsers,
    sendFriendRequest
} from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const userRouter = express.Router();

userRouter.get("/", isAuth, getRecommendedUsers);
userRouter.get("/friends", isAuth, getMyFriends);

userRouter.post("/friend-request/:id", isAuth, sendFriendRequest);
userRouter.put("/friend-request/:id/accept", isAuth, accpetFriendRequest);
userRouter.get("/friend-requests", isAuth, getAllFriendRequests);

userRouter.get("/outgoing-requests", isAuth, getAllOutgoingFriendRequests);

export default userRouter;