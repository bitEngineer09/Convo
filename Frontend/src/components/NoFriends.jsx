import React from 'react'

const NoFriends = () => {
    return (
        <div
            className='
                flex flex-col items-center justify-center 
                h-full 
                bg-base-200 rounded-xl
                border border-primary-content
            '>
            <p>No friends yet</p>
            <p className='text-base-content'>Connect with partners below to start hanving convo together!</p>
        </div>
    )
}

export default NoFriends