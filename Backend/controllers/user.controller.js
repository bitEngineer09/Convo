import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";


// get recommended users
export const getRecommendedUsers = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const currentUserId = req.user.id;
        const currentUser = await User.findById(currentUserId);

        if (!currentUser) return res.status(404).json({success: false, message: "User not found"});

        const excludeIds = currentUser.friends || []

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: excludeIds } },
                { isOnboarded: true },
            ]
        });

        return res.status(200).json({
            success: true,
            recommendedUsers
        });

    } catch (error) {
        console.error("Error in getRecommendedUsers controller", error.message);
        return res.status(500).json({
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
        if (myId === recipientId) return res.status(400).json({ success: false, message: "You can't send friend request to yourself" });

        const recipient = await User.findById(recipientId);
        if (!recipient) return res.status(400).json({ message: "Recipient not found" });

        // prevent sending friend req to already a friend
        if (recipient.friends.includes(myId)) return res.status(400).json({ success: false, message: "You are already friends" });

        // check if req already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });

        if (existingRequest)
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

        const requestId = req.params.id;

        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) return res.status(400).json({ success: false, message: "No friend request found" });

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
    if (!req.user)
      return res.status(400).json({
        success: false,
        message: "You are not authenticated",
      });

    const userId = req.user.id;

    const incommingRequests = await FriendRequest.find({
      recipient: userId,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage bio");

    const acceptedAsRecipient = await FriendRequest.find({
      recipient: userId,
      status: "accepted",
    }).populate("sender", "fullName profilePic nativeLanguage bio");

    const acceptedAsSender = await FriendRequest.find({
      sender: userId,
      status: "accepted",
    }).populate("recipient", "fullName profilePic nativeLanguage bio");

    const acceptedRequests = [...acceptedAsRecipient, ...acceptedAsSender];

    return res.status(200).json({
      success: true,
      incommingRequests,
      acceptedRequests,
    });
  } catch (error) {
    console.error("Error in getAllFriendRequests controller", error.message);
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// get all outgoing friend requests
export const getAllOutgoingFriendRequests = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic nativeLanguage");

        return res.status(200).json({
            success: true,
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

// remove a friend
export const removeFriend = async (req, res) => {
    try {
        const friendId = req.params.id;
        const currUserId = req.user.id;

        const currentUser = await User.findById(currUserId);
        const friendUser = await User.findById(friendId);

        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "Current user not found",
            });
        }

        if (!friendUser) {
            return res.status(404).json({
                success: false,
                message: "Friend user not found",
            });
        };

        // Check if they are actually friends
        const isFriendInCurrentUser = currentUser.friends.includes(friendId);
        const isCurrentUserInFriend = friendUser.friends.includes(currUserId);

         if (!isFriendInCurrentUser || !isCurrentUserInFriend) {
            return res.status(400).json({
                success: false,
                message: "You are not friends with this user",
            });
        };

        // Remove from both users' friends lists
        currentUser.friends = currentUser.friends.filter(
            id => id.toString() !== friendId
        );

        friendUser.friends = friendUser.friends.filter(
            id => id.toString() !== currUserId
        );

        await Promise.all([
            currentUser.save(),
            friendUser.save()
        ]);

        return res.status(200).json({
            success: true,
            message: "Friend removed successfully",
        });
        
    } catch (error) {
        console.error("Error in removeFriend controller:", error.message);
        return res.status(400).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

// reject a friend
export const rejectFriendRequest = async (req, res) => {
    try {
        const { id: requestId } = req.params;
        const currUserId = req.user.id;

        if (!requestId) {
            return res.status(400).json({
                success: false,
                message: "Request ID is required",
            });
        }

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({
                success: false,
                message: "Friend request not found",
            });
        }

        if (friendRequest.recipient.toString() !== currUserId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to reject this request",
            });
        }

        if (friendRequest.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: "This request has already been processed",
            });
        }

        friendRequest.status = 'rejected';
        await friendRequest.save();

        return res.status(200).json({
            success: true,
            message: "Friend request rejected successfully",
        });

    } catch (error) {
        console.error("Error in rejectFriendRequest controller:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}