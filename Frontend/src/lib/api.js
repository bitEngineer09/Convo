import { axiosInstance } from "./axios";
export const auth = async (newUser, signupData, loginData) => {

    const formData = newUser ? signupData : loginData;
    const endpoint = newUser ? "/auth/signup" : "/auth/login";

    const res = await axiosInstance.post(endpoint, formData);
    console.log(res.data);
    return res.data;
};