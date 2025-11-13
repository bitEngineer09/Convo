import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api";
import toast from "react-hot-toast";

export const useOnboarding = () => {

    const queryClient = useQueryClient();

    const { isPending, error, mutate } = useMutation({
        mutationFn: ({ formState }) => completeOnboarding(formState),

        onSuccess: (_, variables) => {
            toast.success("Onboarding Completed");
            // success hone ke baad authUser refetch hoga
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            // queryClient.invalidateQueries({queryKey: ["userData"]});
            variables.navigate("/");
        },

        onError: (error) => {
            toast.error(error.response.data.message);
            console.log("Onboarding error: ", error?.response?.data || error?.message)
        }
    });
    return { isPending, error, onboardingMutation: mutate };
};