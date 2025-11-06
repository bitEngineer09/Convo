import React from 'react'
import { axiosInstance } from '../lib/axios'
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
import { Navigate } from 'react-router-dom';

const getMe = async () => {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
};

const ProtectedRoute = ({ children }) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["authUser"],
        queryFn: getMe,
        retry: false,
    });

    if (isLoading) return <Loader />;
    if (isError) return <Navigate to="/auth" replace />;

    const user = data?.user;
    return user ? children : <Navigate to="/auth" replace />;

}

export default ProtectedRoute;