import User from "../models/user.model.js";
import argon2 from 'argon2';
import { authenticate, isUserExists } from "../services/auth.services.js";
import Session from "../models/session.model.js";
import { upsertStreamUser } from "../config/stream.js";

// Signup Controller----------------------------------------------------------------
export const signupController = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) return res.status(400).json({
            success: false,
            message: "Incomplete Credentials"
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });

        const idx = Math.floor(Math.random() * 100) + 1; // generates number between 1-100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`;

        // checking if user already exists ?
        const user = await isUserExists(email);
        if (user) return res.status(400).json({
            success: false,
            message: "User already exists"
        });

        // Hashing password
        const hashedPassword = await argon2.hash(password);
        if (!hashedPassword) return res.status(400).json({
            success: false,
            message: "Password hashing error",
        });

        const newUser = await User.create(
            {
                fullName,
                email,
                password: hashedPassword,
                profilePic: randomAvatar,
            });

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            });
            console.log(`Stream user created for ${newUser.id}: ${newUser.fullName}`);

        } catch (error) {
            console.error(`Error creating Stream User: ${error.message}`);
        }

        await authenticate(req, res, newUser);

        return res.status(201).json({
            success: true,
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                createdAt: newUser.createdAt,
            },
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        return res.status(500).json({
            success: false,
            message: `signup controller error: ${error.message}`,
        })
    }
};


// Login Controller----------------------------------------------------------------
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({
            success: false,
            message: "Incomplete credentials"
        });

        const user = await isUserExists(email);

        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        });

        const verifyPassword = await argon2.verify(user.password, password);
        if (!verifyPassword) return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        });

        await authenticate(req, res, user);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            // user: {
            //     id: user._id,
            //     fullName: user.fullName,
            //     email: user.email,
            // }
        })

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            success: false,
            message: `login controller error: ${error.message}`
        });
    }
}


// Logout Controller----------------------------------------------------------------
export const logoutController = async (req, res) => {
    try {
        console.log(req.user)
        if (!req.user) return res.status(400).json({
            success: false,
            message: "You are not authenticated"
        });

        const sessionId = req.user.sessionId;
        if (!sessionId) return res.status(400).json({
            success: false,
            message: "No session found"
        });

        await Session.findByIdAndDelete(sessionId);

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");

        return res.status(200).json({
            success: true,
            message: "User logged out",
        })


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: `Logout controller error: ${error.message}`
        })
    }
}


// Get logged in user data----------------------------------------------------------------
export const getUserData = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({
            success: false,
            message: "You are not authenticated"
        });

        const user = await User.findById(req.user.id);

        if (!user) return res.status(400).json({
            success: false,
            message: "User not found",
        });

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: `error fetching user data: ${error.message}`
        })
    }
}


// Onboarding controller
export const onboardingController = async (req, res) => {
  try {
    if (!req.user) return res.status(400).json({ 
        success: false, 
        message: "You are not authenticated" 
      });

    const userId = req.user.id;
    const { fullName, bio, nativeLanguage, location } = req.body;


    if (!fullName || !bio || !nativeLanguage || !location) return res.status(400).json({ 
        success: false, 
        message: "All fields are not provided" 
      });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        fullName,
        bio,
        nativeLanguage, 
        location,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) return res.status(400).json({ 
        success: false, 
        message: "Error occurred in updating the user onboarding details" 
      });

    try {
      // Update Stream chat user with the new information
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser._id}: ${updatedUser.fullName}`);
      
    } catch (streamError) {
      console.error("Error updating Stream user during onboarding:", streamError.message);
    }

    return res.status(200).json({ 
      success: true, 
      message: "Onboarding details updated successfully",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        bio: updatedUser.bio,
        nativeLanguage: updatedUser.nativeLanguage,
        location: updatedUser.location,
        isOnboarded: updatedUser.isOnboarded
      }
    });

  } catch (error) {
    console.error("Onboarding controller error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: `Onboarding controller error: ${error.message}` 
    });
  }
};
