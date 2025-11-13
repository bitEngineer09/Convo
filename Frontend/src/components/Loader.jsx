import React from 'react'
import { ring } from 'ldrs'
ring.register();

const Loader = () => {
    return (
        <l-ring
            size="25"
            stroke="5"
            bg-opacity="0"
            speed="2"
            color="white"
        />
    )
}

export default Loader