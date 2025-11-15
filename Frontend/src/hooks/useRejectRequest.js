import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { rejectFriendRequest } from '../lib/api';

export const useRejectRequest = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: rejectFriendRequest,

        onSuccess: () => {
            toast.success("Friend request rejected");
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to reject request");
        },
    });

    return { rejectRequestMutation: mutate, isPending, error };
};