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

    const { data, isLoading } = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
    });

    if (isLoading) return <Loader />
    const user = data?.user;
    return user ? children : <Navigate to="/auth" replace />;

}

export default ProtectedRoute;