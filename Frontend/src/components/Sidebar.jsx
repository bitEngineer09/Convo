import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useUserData } from '../hooks/useUserData'

const Sidebar = () => {
    const navLinks = [
        { link: "Home", path: "/", icon: <IoHomeOutline /> },
        { link: "Friends", path: "/friends", icon: <FaUserFriends /> },
        { link: "Notifications", path: "/notifications", icon: <IoNotificationsOutline /> },
    ];

    const { userData } = useUserData();

    return (
        <aside
            className="
                bg-base-200 border-r border-base-300
                w-16 sm:w-20 lg:w-64
                h-full 
                px-2 sm:px-3 py-5
                flex flex-col justify-between
            ">
            {/* Navigation Links */}
            <div className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
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
                            `}
                        title={link.link}
                    >
                        <p className={({ isActive }) =>
                            `
                            text-xl sm:text-2xl lg:text-base
                            text-base-content
                            ${isActive ? "text-primary" : ""}
                        `
                        }>{link.icon}</p>
                        <p className="hidden lg:block ">{link.link}</p>
                    </NavLink>
                ))}
            </div>

            {/* Bottom Profile Section */}
            <div className="flex items-center gap-2 p-2 lg:p-3 border border-t border-base-300 mt-auto rounded-xl">
                <img src={userData?.profilePic} className="size-10 rounded-full bg-zinc-700" />
                <div className="hidden lg:block">
                    <p className="text-sm text-base-content font-semibold">{userData?.fullName}</p>
                    <div className='flex items-center gap-1'>
                        <div className="text-xs bg-success size-2 rounded-full"></div>
                        <p className='text-success'>Online</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
