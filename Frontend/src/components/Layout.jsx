import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='w-full h-screen overflow-hidden flex flex-col '>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <Sidebar />

                {/* Main content */}
                <div className='flex-1 overflow-y-auto p-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;
