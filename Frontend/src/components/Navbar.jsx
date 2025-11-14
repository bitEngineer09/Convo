import React from 'react'
import { LuMessageCircleHeart } from "react-icons/lu"
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../hooks/useUserData';

const Navbar = () => {

    const { userData } = useUserData();

    const navigate = useNavigate();

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
                <img
                    onClick={() => navigate("/profile")}
                    src={userData?.profilePic}
                    className='size-10 cursor-pointer'
                    alt="user avatar"
                />
            </div>
        </nav>
    )
}

export default Navbar;