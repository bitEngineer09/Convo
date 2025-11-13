import React from 'react'

const NoNewNotifications = () => {
    return (
        <div className='w-full h-full flex items-center justify-center text-center px-4 py-8 sm:py-12 md:py-16'>
            <div className='flex flex-col items-center gap-3 sm:gap-4'>
                <div className='text-4xl sm:text-5xl md:text-6xl opacity-50'>
                    🔔
                </div>
                <p className='text-base sm:text-lg md:text-xl text-base-content/70 font-medium'>
                    No notifications to show here yet
                </p>
                <p className='text-xs sm:text-sm text-base-content/50 max-w-xs sm:max-w-sm'>
                    When you receive friend requests or new connections, they'll appear here
                </p>
            </div>
        </div>
    )
}

export default NoNewNotifications