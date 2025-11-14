import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Notifications from './pages/Notifications';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Layout from './components/Layout';
import { useAuthUser } from './hooks/useAuthUser';
import { useUserData } from './hooks/useUserData';
import PageLoader from './components/PageLoader';
import { Toaster } from 'react-hot-toast';
import { useThemeSlot } from './store/useThemeSlot';
import Profile from './pages/Profile';

const App = () => {
    const { isLoading: authLoading, authUser } = useAuthUser();
    const { isLoading: userLoading, userData } = useUserData();
    const { theme } = useThemeSlot();

    const isAuthenticated = Boolean(authUser);
    const isOnboarded = userData?.isOnboarded;

    // console.log("Auth Status:", { isAuthenticated, isOnboarded, userData });

    if (authLoading || userLoading) return <PageLoader />;

    return (
        <div data-theme={theme} className='transition-colors duration-400'>
            <Routes>
                <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/" replace />} />
                
                <Route 
                    path="/onboarding" 
                    element={
                        isAuthenticated && !isOnboarded ? <Onboarding /> : <Navigate to="/" replace />
                    } 
                />

                {isAuthenticated && isOnboarded ? (
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/chat/:id" element={<ChatPage />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/call/:id" element={<CallPage />} />
                        <Route path="/friends" element={<Friends />} />
                    </Route>
                ) : (
                    <Route path="*" element={
                        <Navigate to={
                            !isAuthenticated ? "/auth" : 
                            !isOnboarded ? "/onboarding" : "/"
                        } replace />
                    } />
                )}
            </Routes>

            <Toaster />
        </div>
    );
};

export default App;
