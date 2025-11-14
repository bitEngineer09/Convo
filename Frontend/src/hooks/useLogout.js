import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from '../lib/api';

export const useLogout = () => {
    const queryClient = useQueryClient();

    const { mutate: logoutMutation, isPending, error } = useMutation({
        mutationFn: ({ navigate }) => logout(),
        onSuccess: (_, { navigate }) => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate("/login");
        },

        onError: (error) => {
            console.log("logout mutation error: ", error?.response?.data?.message);
        }
    });

    return { logoutMutation, isPending, error };
};
