import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Notifications from './pages/Notifications';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import Home from './pages/Home';
import { useAuthUser } from './hooks/useAuthUser';
import PageLoader from './components/PageLoader';
import { useUserData } from './hooks/useUserData';

const App = () => {

    const { isLoading: authLoading, authUser } = useAuthUser();
    const { isLoading: userLoading, userData } = useUserData();

    const isAuthenticated = Boolean(authUser);
    if (authLoading || userLoading) return <PageLoader />;

    return (
        <Routes>
            {/* Public Route */}
            <Route path="/auth" element={<Auth />} />

            {/* Protected Routes — redirect to /auth if not logged in */}
            <Route path="/" element={isAuthenticated && userData?.isOnboarded ? <Home /> : <Navigate to={!isAuthenticated ? "/auth" : "/onboarding"} replace />} />
            <Route path="/onboarding" element={isAuthenticated ? <Onboarding /> : <Navigate to="/auth" replace />} />
            <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Navigate to="/auth" replace />} />
            <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/auth" replace />} />
            <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/auth" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;
