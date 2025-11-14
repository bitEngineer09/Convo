import Session from "../models/session.model.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

// checking if user already exists ?
export const isUserExists = async (email) => {
    try {
        const user = await User.findOne({ email }).select("+password");
        return user;
    } catch (error) {
        console.error(error.message);
        return;
    }
}


//! COOKIES PART -------------------------------------------------------------------
export const createSession = async ({ ip, userAgent, userId }) => {
    return await Session.create({ ip, userAgent, userId });
}

export const createAccessToken = ({ id, name, email, sessionId }) => {
    return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const createAccessTokenAdmin = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const createRefreshToken = (sessionId) => {
    return jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
};


//? AUTHENTICATE Function
export const authenticate = async (req, res, loggedInUser, registeredUser) => {
    const account = loggedInUser ?? registeredUser;
    const { _id: id, fullName, email } = account;
    const name = fullName;

    const session = await createSession({
        ip: req.clientIp,
        userAgent: req.headers["user-agent"],
        userId: id,
    })

    const accessToken = createAccessToken({
        id,
        name,
        email,
        sessionId: session._id
    });

    const refreshToken = createRefreshToken(session._id);

    const baseConfig = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    }

    res.cookie("access_token", accessToken, baseConfig);

    res.cookie("refresh_token", refreshToken, baseConfig);
}
//?--------------------------------------------------------------------

// REFRESH THE TOKENS
export const refreshTheTokens = async (refreshToken) => {
    try {
        const decodedToken = verifyToken(refreshToken);
        if (!decodedToken) throw new Error("Invalid session")

        const currentSession = await Session.findById(decodedToken.sessionId);
        if (!currentSession) throw new Error("Invalid session");

        const user = await User.findById(currentSession.userId);
        if (!user) throw new Error("Invalid session");

        const userInfo = {
            id: user._id,
            name: user.fullName,
            email: user.email,
            sessionId: currentSession._id,
        }

        const newAccessToken = createAccessToken(userInfo);

        const newRefreshToken = createRefreshToken(currentSession._id);

        return { newAccessToken, newRefreshToken, user: userInfo };

    } catch (error) {
        console.log(`refresh the token method error:${error}`);
        return { error: `refresh the token error: ${error.message}` };
    }
}