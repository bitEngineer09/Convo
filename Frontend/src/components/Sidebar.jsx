import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useUserData } from '../hooks/useUserData';
import { LuPalette } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";
import { useLogout } from '../hooks/useLogout';
import ThemeSelector from './ThemeSelector';

const Sidebar = () => {

    const { userData } = useUserData();
    const [themePopup, setThemePopup] = useState(false);
    const { logoutMutation } = useLogout();
    const navigate = useNavigate();

    const navLinks = [
        { link: "Home", path: "/", icon: <IoHomeOutline /> },
        { link: "Friends", path: "/friends", icon: <FaUserFriends /> },
        { link: "Notifications", path: "/notifications", icon: <IoNotificationsOutline /> },
        { link: "Theme", onClick: () => setThemePopup(true), icon: <LuPalette /> },
        { link: "Logout", onClick: () => logoutMutation(navigate), icon: <IoExitOutline /> },
    ];


    return (
        <aside
            className="
                bg-base-200 border-r border-base-300
                w-16 sm:w-20 lg:w-64
                h-full 
                px-2 sm:px-3 py-5
                flex flex-col justify-between
                relative
            ">
            {/* Navigation Links */}
            <div className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                    link.path ?
                        <NavLink
                            key={index}
                            to={link.path}
                            end
                            className={({ isActive }) =>
                                `
                            flex items-center 
                            gap-2
                            px-2 sm:px-3 lg:px-4 py-3
                            rounded-full 
                            font-medium 
                            cursor-pointer 
                            transition justify-center lg:justify-start
                            ${isActive ? "bg-primary/10 text-primary" : ""}
                            hover:bg-primary/10 hover:text-primary
                            `}
                            title={link.link}
                        >
                            <p className="text-xl sm:text-2xl lg:text-base">
                                {link.icon}
                            </p>
                            <p className="hidden lg:block">{link.link}</p>
                        </NavLink>
                        : (
                            <button
                                key={index}
                                onClick={link.onClick}
                                className='
                                    flex items-center 
                                    gap-2
                                    px-2 sm:px-3 lg:px-4 py-3
                                    rounded-full 
                                    font-medium 
                                    cursor-pointer 
                                    transition justify-center lg:justify-start
                                    hover:bg-primary/10 hover:text-primary
                                '>
                                <p className="text-xl sm:text-2xl lg:text-base">
                                    {link.icon}
                                </p>
                                <p className="hidden lg:block">{link.link}</p>
                            </button>
                        )
                ))}
            </div>

            {/* Bottom Profile Section */}
            <div className="flex items-center gap-2 p-2 lg:p-3 border-t border-base-300 mt-auto rounded-xl">
                <img 
                    src={userData?.profilePic} 
                    className="size-10 rounded-full object-cover" 
                    alt="Profile"
                />
                <div className="hidden lg:block">
                    <p className="text-sm font-semibold truncate">{userData?.fullName}</p>
                    <div className='flex items-center gap-1'>
                        <div className="size-2 bg-success rounded-full"></div>
                        <p className='text-xs text-success'>Online</p>
                    </div>
                </div>
            </div>

            {/* Theme Selector Modal */}
            {themePopup && <ThemeSelector onClose={() => setThemePopup(false)} />}
        </aside>
    );
};

export default Sidebar;