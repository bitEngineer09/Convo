import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    valid: {
        type: Boolean,
        required: true,
        default: true,
    },
    ip: {
        type: String,
        max_length: 255,
    },
    userAgent: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {timestamps: true});

const Session = mongoose.model("Session", sessionSchema);

export default Session;