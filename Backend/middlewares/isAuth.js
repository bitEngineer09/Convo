import { refreshTheTokens, verifyToken } from "../services/auth.services.js";

export const isAuth = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;

        req.user = null;

        if (!accessToken && !refreshToken) {
            req.user = null;
            return next();
        }

        if (accessToken) {
            try {
                const decodedToken = verifyToken(accessToken);
                req.user = decodedToken;

                return next();
            } catch (error) {
                console.log(`error in decoded token: ${error}`);
            }
        }

        if (refreshToken) {
            try {
                const { newAccessToken, newRefreshToken, user } = await refreshTheTokens(refreshToken);

                req.user = user;


                const baseConfig = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                };

                res.cookie("access_token", newAccessToken, {
                    ...baseConfig
                });

                res.cookie("refresh_token", newRefreshToken, {
                    ...baseConfig
                });

                return next();

            } catch (error) {
                console.log(`refresh token error: ${error}`);
                return res.status(400).json({ message: `refresh token error:${error}` });
            }
        }

    } catch (error) {
        return res.status(400).json({ success: false, message: `isAuth middleware error: ${error}` })
    }
    return next();
}