import React from 'react'
import { FaVideo } from "react-icons/fa6";

function CallButton({handleVideoCall}) {
    return (
        <div>
            <button onClick={handleVideoCall} className='cursor-pointer'>
                <FaVideo  className="size-6 text-primary " />
            </button>
        </div>
    )
}

export default CallButton