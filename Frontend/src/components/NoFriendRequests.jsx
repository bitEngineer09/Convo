import React from 'react'

const NoFriendRequests = () => {
    return (
        <div
            className='
                flex flex-col items-center justify-center 
                min-h-40 mt-2
                bg-base-200 rounded-xl
                border border-primary-content
            '>
            <p>No friends Requests found</p>
            <p className='text-base-content'>Upcomming friend request will appear here!</p>
        </div>
    )
}

export default NoFriendRequests