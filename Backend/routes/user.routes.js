import express from 'express';
import {
    accpetFriendRequest,
    getAllFriendRequests,
    getAllOutgoingFriendRequests,
    getMyFriends,
    getRecommendedUsers,
    rejectFriendRequest,
    removeFriend,
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

userRouter.delete("/remove-friend/:id", isAuth, removeFriend);
userRouter.delete("/reject-request/:id", isAuth, rejectFriendRequest);

export default userRouter;