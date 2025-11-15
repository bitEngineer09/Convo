import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from '../lib/api';

export const useLogout = () => {
    const queryClient = useQueryClient();

    const { mutate: logoutMutation, isPending, error } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },

        onError: (error) => {
            console.log("logout mutation error: ", error);
        }
    });

    return { logoutMutation, isPending, error };
};
