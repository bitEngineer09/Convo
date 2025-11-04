import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = async (req, res) => {
    try {
        const token = generateStreamToken(req.user.id);

        return res.status(200).json({
            success: true,
            token
        })

    } catch (error) {
        console.error("Error in getStreamToken controller", error.message);
        return res.status(400).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}