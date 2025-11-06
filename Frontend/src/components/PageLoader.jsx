import React from 'react'
import { lineSpinner } from 'ldrs'
lineSpinner.register()

const PageLoader = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <l-line-spinner
            size="40"
            stroke="3"
            speed="1"
            color="white"
        ></l-line-spinner>
        </div>
    )
}

export default PageLoader