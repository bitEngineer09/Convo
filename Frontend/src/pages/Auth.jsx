import React, { useState } from 'react'
import { LuMessageCircleHeart } from "react-icons/lu"
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import chatLogo from '../assets/chatlogo.png'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useSignUp } from '../hooks/useAuth';


const Auth = () => {

    const [newUser, setNewUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const {isPending, error, authMutaion} = useSignUp();

    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        authMutaion({ newUser, signupData, loginData, navigate });
    };


    return (
        <div
            className='
                w-full min-h-screen
                bg-zinc-900
                flex items-center justify-center
                text-white
                p-3 sm:p-4 md:p-6
            '>

            {/* Main container */}
            <div className='flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 w-full max-w-5xl'>

                {/* Left Content */}
                <div className='w-full lg:w-1/2 border-2 bg-zinc-950 border-blue-700 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8'>

                    {/* Logo */}
                    <div className='
                        flex items-center 
                        font-semibold 
                        gap-1 sm:gap-2
                        text-blue-600 text-lg sm:text-2xl md:text-3xl lg:text-4xl
                        mb-3 sm:mb-4
                    '>
                        <LuMessageCircleHeart />
                        <h1>Convo</h1>
                    </div>

                    <div className='mb-4 sm:mb-5 md:mb-6'>
                        <p className='font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2'>
                            {newUser ? 'Create Account' : 'Welcome Back'}
                        </p>
                        <p className='text-xs sm:text-sm md:text-base text-zinc-400'>
                            {newUser ? 'Join us to start your convo journey' : 'Sign in to continue your language journey'}
                        </p>
                    </div>

                    <form action="" className='text-sm sm:text-base' onSubmit={formSubmitHandler}>
                        {
                            newUser && (
                                <div className='mb-3 sm:mb-4'>
                                    <div className='flex items-center gap-1.5 sm:gap-2 mb-2'>
                                        <CgProfile className='text-sm sm:text-base' />
                                        <label htmlFor="name" className='text-xs sm:text-sm md:text-base'>Name</label>
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="fullName"
                                        value={signupData.fullName}
                                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                                        placeholder="Your full name"
                                        className="
                                            bg-zinc-800
                                            border-2 border-zinc-700
                                            py-2 sm:py-2.5 md:py-3 px-3 sm:px-4
                                            w-full
                                            rounded-xl
                                            text-white text-sm sm:text-base
                                            outline-none
                                            focus:border-blue-500
                                            transition-colors duration-400
                                            placeholder:text-zinc-500
                                        "
                                    />
                                </div>
                            )
                        }

                        <div className='mb-3 sm:mb-4'>
                            <div className='flex items-center gap-1.5 sm:gap-2 mb-2'>
                                <MdEmail className='text-sm sm:text-base' />
                                <label htmlFor="email" className='text-xs sm:text-sm md:text-base'>Email</label>
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={newUser ? signupData.email : loginData.email}
                                onChange={(e) => {
                                    if (newUser) {
                                        setSignupData({
                                            ...signupData, email: e.target.value
                                        });
                                    } else {
                                        setLoginData({
                                            ...loginData, email: e.target.value
                                        })
                                    }
                                }}
                                placeholder="your.email@example.com"
                                className="
                                    bg-zinc-800
                                    border-2 border-zinc-700
                                    py-2 sm:py-2.5 md:py-3 px-3 sm:px-4
                                    w-full
                                    rounded-xl
                                    text-white text-sm sm:text-base
                                    outline-none
                                    focus:border-blue-500
                                    transition-colors
                                    placeholder:text-zinc-500
                                    "
                            />
                        </div>

                        <div className='mb-4 sm:mb-5 md:mb-6 relative'>
                            <div className='flex items-center gap-1.5 sm:gap-2 mb-2'>
                                <FaLock className='text-sm sm:text-base' />
                                <label htmlFor="password" className='text-xs sm:text-sm md:text-base'>Password</label>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={newUser ? signupData.password : loginData.password}
                                onChange={(e) => {
                                    if (newUser) {
                                        setSignupData({
                                            ...signupData, password: e.target.value
                                        });
                                    } else {
                                        setLoginData({
                                            ...loginData, password: e.target.value
                                        });
                                    }
                                }}
                                placeholder="Enter your password"
                                className="
                                    bg-zinc-800
                                    border-2 border-zinc-700
                                    py-2 sm:py-2.5 md:py-3 px-3 sm:px-4
                                    w-full
                                    rounded-xl
                                    text-white text-sm sm:text-base
                                    outline-none
                                    focus:border-blue-500
                                    transition-colors
                                    placeholder:text-zinc-500
                                    "
                            />

                            {/* Show password icon */}
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-4 top-[59%] md:top-13'>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>

                        {
                            error && (
                                <div role="alert" className="alert alert-error alert-soft mb-6">
                                    <span>{error?.response?.data?.message}</span>
                                </div>
                            )
                        }

                        {/* Sign in button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className='
                                cursor-pointer
                                bg-blue-600 hover:bg-blue-700
                                w-full
                                py-2.5 sm:py-3 md:py-3.5
                                rounded-xl
                                transition-all duration-300
                                font-semibold text-white
                                text-sm sm:text-base md:text-lg
                                hover:scale-[1.02]
                                active:scale-95
                            '>
                            {isPending ? (
                                <Loader />
                            ) :
                                (newUser ? "Create Account" : "Sign in")
                            }

                        </button>


                        {
                            newUser ?
                                <p
                                    className='
                                        text-center
                                        mt-4 sm:mt-5 md:mt-6
                                        text-xs sm:text-sm md:text-base
                                        text-zinc-400
                                    '>
                                    Already have an account?
                                    <span
                                        onClick={() => setNewUser(!newUser)}
                                        className='
                                            cursor-pointer
                                            underline underline-offset-2
                                            text-blue-500 ml-1.5 hover:text-blue-400
                                            font-semibold
                                            transition-colors
                                        '>
                                        Sign in
                                    </span>
                                </p>
                                :
                                <p className='text-center mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm md:text-base text-zinc-400'>
                                    Don't have an account?
                                    <span
                                        onClick={() => setNewUser(!newUser)}
                                        className='
                                            cursor-pointer
                                            underline underline-offset-2
                                            text-blue-500 ml-1.5 hover:text-blue-400
                                            font-semibold
                                            transition-colors
                                        '>
                                        Create one
                                    </span>
                                </p>
                        }
                    </form>
                </div>

                {/* Right Content */}
                <div
                    className='
                        hidden lg:block
                        w-full lg:w-1/2
                        bg-blue-700 
                        p-4 sm:p-5 md:p-6 lg:p-8
                        rounded-xl text-center
                        order-first lg:order-last 
                        shadow-xl
                    '>
                    <div className='rounded-lg overflow-hidden mb-3 sm:mb-4 md:mb-5'>
                        <img src={chatLogo} alt="two-person-talking" className='w-full h-auto object-cover' />
                    </div>
                    <div className='px-2 sm:px-3 md:px-4 lg:px-5'>
                        <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3'>
                            Connect with language partners worldwide
                        </p>
                        <p className='text-xs sm:text-sm md:text-base text-blue-50'>
                            Practice conversations, make friends, and improve your language skills together
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth