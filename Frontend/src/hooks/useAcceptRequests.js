import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accpetFriendRequest } from "../lib/api";

export const useAcceptRequests = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: accpetFriendRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["friends"] });
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
        },
        onError: (error) => {
            console.log("Error in acceptRequestMutation: ", error.message);
        }
    });
    return { isPending, error, accpetRequestMutation: mutate }
}