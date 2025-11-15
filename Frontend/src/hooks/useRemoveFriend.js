import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFriend } from "../lib/api";
import toast from 'react-hot-toast';

export const useRemoveFriend = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: (id) => removeFriend(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["friends"]);
            toast.success("Friend removed successfully");
        }, 
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to remove friend");
        },
    });
    return {removeFriendMutation:mutate, isPending, error};
}