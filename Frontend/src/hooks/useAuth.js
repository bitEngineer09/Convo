import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "../lib/api";
import toast from "react-hot-toast";

export const useSignUp = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: ({ newUser, signupData, loginData }) => auth(newUser, signupData, loginData),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            variables.newUser ? variables.navigate("/onboarding") : variables.navigate("/");
        },

        onError: (error) => {
            toast.error(error.response.data.message);
            console.error("Auth error:", error?.response?.data || error.message);
        },

    });
    return { isPending, error, authMutaion: mutate }
};