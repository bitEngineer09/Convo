import React from 'react'
import { lineSpinner } from 'ldrs'
lineSpinner.register()

const ChatLoader = () => {
    return (
        <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
            <l-line-spinner
            size="40"
            stroke="3"
            speed="1"
            color="white"
        ></l-line-spinner>
        <p className='tracking-wider text-lg'>Connecting to chat...</p>
        </div>
    )
}

export default ChatLoader