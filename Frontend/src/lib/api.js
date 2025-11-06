import { axiosInstance } from "./axios";

// get auth user
export const getAuthUser = async () => {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
};

// get user data
export const getUserData = async () => {
    const res = await axiosInstance.get("/auth/getUserData");
    return res.data;
}

// singup / login 
export const auth = async (newUser, signupData, loginData) => {

    const formData = newUser ? signupData : loginData;
    const endpoint = newUser ? "/auth/signup" : "/auth/login";

    const res = await axiosInstance.post(endpoint, formData);
    console.log(res.data);
    return res.data;
};

