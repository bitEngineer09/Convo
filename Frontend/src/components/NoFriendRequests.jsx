import React from 'react'
import { LuMessageSquareMore } from "react-icons/lu";

const NoFriendRequests = () => {
    return (
        <div
            className='
                flex flex-col items-center justify-center 
                min-h-40 mt-2 sm:mt-3 md:mt-4
                bg-base-200 rounded-xl
                border border-base-content/20
                px-4 sm:px-6 py-6 sm:py-8
                text-center
            '>
            <div className='flex flex-col items-center gap-2 sm:gap-3 max-w-md'>
                <div className='text-3xl sm:text-4xl md:text-5xl opacity-50 mb-1 sm:mb-2'>
                    <LuMessageSquareMore />
                </div>
                <p className='text-base sm:text-lg md:text-xl font-medium text-base-content'>
                    No friend requests found
                </p>
                <p className='text-xs sm:text-sm md:text-base text-base-content/70'>
                    Upcoming friend requests will appear here!
                </p>
            </div>
        </div>
    )
}

export default NoFriendRequests