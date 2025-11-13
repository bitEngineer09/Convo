import React, { useState } from 'react'
import { LuMessageCircleHeart } from "react-icons/lu"
import { IoNotificationsOutline } from "react-icons/io5"
import { LuPalette } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useUserData } from '../hooks/useUserData';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {

    const navigate = useNavigate();
    const [openThemeSelector, setOpenThemeSelector] = useState(false);
    const { userData } = useUserData();

    // logout query
    const { logoutMutation } = useLogout();

    return (
        <nav
            className='
                w-full h-17
                flex items-center justify-between 
                px-3 sm:px-4 
                bg-base-200 border-b border-base-300
            '>
            {/* Logo */}
            <div
                onClick={() => navigate("/")}
                className='
                    text-3xl md:text-4xl
                    flex items-center 
                    gap-1 cursor-pointer
                    bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary
                    font-medium
                '>
                <LuMessageCircleHeart className='text-primary' />
                <span>Convo</span>
            </div>

            {/* Right Icons */}
            <div className='flex text-xl sm:text-3xl gap-3 sm:gap-5 relative'>
                <IoNotificationsOutline className='cursor-pointer hover:text-blue-500 transition-colors duration-200' />
                <LuPalette
                    onClick={() => {
                        setOpenThemeSelector(!openThemeSelector);
                    }}
                    className='cursor-pointer hover:text-blue-500 transition-colors duration-200' />
                {
                    openThemeSelector ?
                        <div className='absolute -left-35 top-12'>
                            <ThemeSelector />
                        </div>
                        : null
                }
                <IoExitOutline
                    onClick={() => logoutMutation(navigate)}
                    className='cursor-pointer hover:text-blue-500 transition-colors duration-200' />

                <img src={userData?.profilePic} className='size-8 cursor-pointer' alt="user avatar"/>
            </div>
        </nav>
    )
}

export default Navbar