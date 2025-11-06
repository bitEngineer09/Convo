import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../lib/api";

export const useUserData = () => {
    const userData = useQuery({
        queryKey: ["userData"],
        queryFn: getUserData,
        retry: false,
    });

    return { isLoading: userData.isLoading, userData: userData.data?.user }
};