import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    bio: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    
    nativeLanguage: {
        type: String,
    },
    location: {
        type: String
    },
    isOnboarded: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;