import React from 'react'

const NoRecommendation = () => {
    return (
        <div
            className='
                flex flex-col items-center justify-center 
                h-full 
                bg-base-200 rounded-xl
                border border-primary-content
                text-base-content
            '>
            <p>No recommendations available</p>
            <p>Check back later for new partners!</p>
        </div>
    )
}

export default NoRecommendation