import React, { useState } from 'react'
import { LuMessageCircleHeart } from "react-icons/lu"
import chatLogo from '../assets/chatlogo.png'


const Auth = () => {

    const [newUser, setNewUser] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className='w-full min-h-screen bg-[#FCF5EB] flex items-center justify-center text-white p-4 sm:p-6 lg:p-8'>

            {/* Main container */}
            <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 w-full max-w-350'>

                {/* Left Content */}
                <div className='w-full lg:w-1/2 border-2 border-blue-700 rounded-xl p-6 sm:p-8 text-black'>

                    {/* Logo */}
                    <div className='flex items-center font-semibold gap-2 text-blue-600 text-5xl sm:text-6xl lg:text-7xl'>
                        <LuMessageCircleHeart />
                        <h1>Convo</h1>
                    </div>

                    <div className='my-6 sm:my-8'>
                        <p className='font-medium text-3xl sm:text-4xl lg:text-5xl'>Welcome Back</p>
                        <p className='text-base sm:text-lg lg:text-xl mt-3'>Sign in to your account to continue your language journey</p>
                    </div>

                    <form action="" className='text-base sm:text-lg lg:text-xl mt-8 sm:mt-12 lg:mt-12' onSubmit={submitHandler}>
                        {
                            newUser ?
                                <div className='mb-5'>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="bg-transparent border-2 border-zinc-600 py-4 sm:py-5 lg:py-6 px-4 w-full mt-3 sm:mt-4 lg:mt-5 rounded-full text-black outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                : ""
                        }

                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="bg-transparent border-2 border-zinc-600 py-4 sm:py-5 lg:py-6 px-4 w-full mt-3 sm:mt-4 lg:mt-5 rounded-full text-black outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="bg-transparent border-2 border-zinc-600 py-4 sm:py-5 lg:py-6 px-4 w-full mt-3 sm:mt-4 lg:mt-5 rounded-full text-white outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Sign in button */}
                        <button className='cursor-pointer bg-blue-600 hover:bg-blue-700 w-full py-4 sm:py-5 lg:py-6 px-4 rounded-full mt-8 sm:mt-10 transition-colors font-medium text-white tracking-wide'>
                            {
                                newUser ? "Create Account" : "Sign in"
                            }
                        </button>
                        

                        {
                            newUser ?
                                <p className='text-center mt-6 sm:mt-8 lg:mt-10 text-sm sm:text-base md:text-xl'>Already have an account?
                                    <span
                                        onClick={() => setNewUser(!newUser)}
                                        className='cursor-pointer underline underline-offset-2 text-blue-500 ml-2 hover:text-blue-400 font-semibold tracking-wide'>Sign in</span>
                                </p>
                                :
                                <p className='text-center mt-6 sm:mt-8 lg:mt-10 text-sm sm:text-base md:text-xl'>Don't have an account?
                                    <span
                                        onClick={() => setNewUser(!newUser)}
                                        className='cursor-pointer underline underline-offset-2 text-blue-500 ml-2 hover:text-blue-400 font-semibold tracking-wide'>Create one</span>
                                </p>
                        }


                    </form>
                </div>

                {/* Right Content */}
                <div className='w-full lg:w-1/2 bg-blue-600 p-6 sm:p-8 rounded-xl text-center order-first lg:order-last'>
                    <img src={chatLogo} alt="two-person-talking" className='rounded-xl w-full h-auto object-cover' />
                    <div className='px-4 sm:px-6 lg:px-5'>
                        <p className='text-xl sm:text-2xl lg:text-3xl font-medium mt-6 sm:mt-8 lg:mt-7 mb-3 sm:mb-4 lg:mb-5'>Connect with language partners worldwide</p>
                        <p className='text-base sm:text-lg lg:text-xl'>Practice conversations, make friends, and improve your language skills together</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth