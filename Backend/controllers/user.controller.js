import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";


// get recommended users
export const getRecommendedUsers = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { $id: { $nin: currentUser.friends } },
                { isOnboarded: true },
            ]
        });

        return res.status(200).json({
            success: true,
            recommendedUsers
        });

    } catch (error) {
        console.error("Error in getRecommendedUsers controller", error.message);
        return res.status(400).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


// get my friends
export const getMyFriends = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        return res.status(200).json({
            success: true,
            friends: user.friends,
        })
    } catch (error) {
        console.error("Error in getMyFriends controller:", error.message);
        return res.status(400).json({
            success: false,
            message: `Error in getMyFriends controller: ${error.message}`,
        })
    }
};


// send friend request
export const sendFriendRequest = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });
        const myId = req.user.id;
        const recipientId = req.params.id;

        // prevents sending req to yourself
        if (myId === recipientId) res.status(400).json({ success: false, message: "You can't send friend request to yourself" });

        const recipient = await User.findById(recipientId);
        if (!recipient) res.status(400).json({ message: "Recipient not found" });

        // prevent sending friend req to already a friend
        if (recipient.friends.includes(myId)) return res.status(400).json({ success: false, message: "You are already friends" });

        // check if req already exists
        const isReqExists = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });

        if (isReqExists)
            return res
                .status(400)
                .json({ success: false, message: "A friend request already exists between you and this user" });

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        return res.status(201).json(
            {
                success: true,
                message: "Friend request sent",
                friendRequest
            }
        );

    } catch (error) {
        console.error("Error in sendFriendRequest controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// accept frined request
export const accpetFriendRequest = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const requestId = req.user.id;

        const friendRequest = await FriendRequest.findById(requestId);
        if (friendRequest) res.status(400).json({ success: false, message: "No friend request found" });

        // Check if current user is the recipient
        if (friendRequest.recipient.toString() !== req.user.id) return res
            .status(400)
            .json({ success: false, message: "You are not authorized to accept this request" });

        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each user to each other friend array
        // $addToSet: adds elements to an array only if they do not already exists
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        });

        return res.status(200).json({
            success: true,
            message: "Friend request accpeted",
        });

    } catch (error) {
        console.error("Error in acceptFriendRequest controller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};


// get all requests
export const getAllFriendRequests = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({
            success: false, message: "You are not authenticated",
        });

        const incommingRequest = await FriendRequest.find({
            recipient: req.user.id,
            status: pending,
        }).populate("sender", "fullName profilePic nativeLanguage");

        const acceptedRequests = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic");

        return res.status(200).json({
            success: false,
            incommingRequest,
            acceptedRequests,
        });

    } catch (error) {
        console.error("Error in get all friend request controller", error.message);
        return res.status(400).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


// get all outgoing friend requests
export const getAllOutgoingFriendRequests = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic nativeLanguage");

        return res.status(200).json({
            success: false,
            outgoingRequests,
        });

    } catch (error) {
        console.error("Error in getAllOutgoingFriendRequests controller:", error.message);
        return res.status(400).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}