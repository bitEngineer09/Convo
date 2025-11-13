import React from 'react'

const NoFriends = () => {
    return (
        <div
            className='
                flex flex-col items-center justify-center 
                min-h-40 h-full 
                bg-base-200 rounded-xl
                border border-primary-content
                px-4 sm:px-6 py-6 sm:py-8
                text-center
            '>
            <div className='flex flex-col items-center gap-2 sm:gap-3 max-w-md'>
                <p className='text-base sm:text-lg md:text-xl font-medium text-base-content'>
                    No friends yet
                </p>
                <p className='text-xs sm:text-sm md:text-base text-base-content/70'>
                    Connect with partners below to start having convo together!
                </p>
            </div>
        </div>
    )
}

export default NoFriends