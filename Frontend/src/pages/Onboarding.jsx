import React, { useState } from 'react'
import { FaShuffle } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdOutlineEditNote } from "react-icons/md";
import { IoLanguageOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { useUserData } from '../hooks/useUserData';
import Loader from '../components/Loader';
import PageLoader from '../components/PageLoader';
import { LANGUAGES } from '../constants/constants';
import { useOnboarding } from '../hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';


const Onboarding = () => {

    const { isLoading, userData } = useUserData();
    console.log(userData);

    const { isPending, onboardingMutation } = useOnboarding();
    const navigate = useNavigate();

    // Form Data
    const [formState, setFormState] = useState({
        profilePic: userData?.profilePic || "",
        fullName: userData?.fullName || "",
        bio: userData?.bio || "",
        nativeLanguage: userData?.nativeLanguage || "English",
        location: userData?.location || ""
    });

    const [randomAvatar, setRandomAvatar] = useState(formState?.profilePic);

    // Form submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        onboardingMutation({ formState, navigate });
    };

    if (isLoading) return <PageLoader />

    return (
        <div
            className='
                w-full min-h-screen
                bg-zinc-900
                flex items-center justify-center
                text-white p-3 sm:p-4 md:p-6
            '>
            <div
                className='
                    w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
                    bg-zinc-950
                    border-2 border-blue-700
                    py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-10 
                    rounded-2xl shadow-xl
                '>

                {/* Avatar section */}
                <section className='flex flex-col gap-2 sm:gap-3 items-center'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-2 sm:mb-3'>
                        Complete your profile
                    </h1>

                    {/* Avatar Circle */}
                    <img
                        src={randomAvatar}
                        className='
                            rounded-full
                            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
                            bg-linear-to-br from-blue-500 to-blue-700 
                            mt-2 sm:mt-3
                            flex items-center justify-center
                            border-4 border-blue-600 shadow-lg
                        '/>
                    {/* <CgProfile className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white opacity-50' /> */}

                    <button
                        onClick={() => {
                            const idx = Math.floor(Math.random() * 100) + 1;
                            const newAvatar = `https://avatar.iran.liara.run/public/${idx}`;
                            setRandomAvatar(newAvatar);
                            setFormState({ ...formState, profilePic: newAvatar });
                        }}
                        className='
                            flex items-center
                            gap-1.5 sm:gap-2
                            bg-blue-600 hover:bg-blue-700
                            rounded-xl cursor-pointer
                            px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3
                            text-white text-xs sm:text-sm md:text-base
                            transition-all duration-300 hover:scale-105
                            font-semibold mt-2 sm:mt-3
                            shadow-md
                        '>
                        <FaShuffle className='text-xs sm:text-sm' /> Generate Random Avatar
                    </button>
                </section>

                {/* Profile Complete Section */}
                <form
                    action=""
                    className='mt-5 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4'
                    onSubmit={submitHandler}
                >

                    {/* Full Name */}
                    <div>
                        <div className='flex items-center gap-1.5 sm:gap-2 mb-2'>
                            <CgProfile className='text-blue-500 text-sm sm:text-base' />
                            <label htmlFor="name" className='text-xs sm:text-sm md:text-base font-medium'>Full Name</label>
                        </div>
                        <input
                            type="text"
                            id="name"
                            placeholder='Enter your full name'
                            value={formState?.fullName}
                            onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                            className='
                                w-full bg-zinc-800 
                                border-2 border-zinc-700
                                px-3 sm:px-4 py-2 sm:py-2.5 md:py-3
                                rounded-xl text-xs sm:text-sm md:text-base outline-none 
                                focus:border-blue-500 transition-all
                                placeholder:text-zinc-500
                            '/>
                    </div>

                    {/* Bio */}
                    <div>
                        <div className='flex items-center gap-1.5 sm:gap-2 mb-2'>
                            <MdOutlineEditNote className='text-blue-500 text-base sm:text-lg' />
                            <label htmlFor="bio" className='text-xs sm:text-sm md:text-base font-medium'>Bio</label>
                        </div>
                        <textarea
                            id="bio"
                            placeholder='Tell us about yourself...'
                            rows="3"
                            value={formState?.bio}
                            onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                            className='
                                w-full
                                py-2 sm:py-2.5 md:py-3 px-3 sm:px-4
                                bg-zinc-800 border-2 border-zinc-700
                                rounded-xl text-xs sm:text-sm md:text-base outline-none 
                                focus:border-blue-500 transition-all resize-none
                                placeholder:text-zinc-500
                            '/>
                    </div>

                    {/* Language */}
                    <div>
                        <div className='flex items-center gap-1.5 sm:gap-2 mb-2'>
                            <IoLanguageOutline className='text-blue-500 text-sm sm:text-base' />
                            <label htmlFor="lang" className='text-xs sm:text-sm md:text-base font-medium'>Native Language</label>
                        </div>
                        <fieldset className="fieldset">
                            <select
                                value={formState?.nativeLanguage}
                                onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                                defaultValue="Pick a language"
                                className="
                                select
                                w-full
                                bg-zinc-800 border-2 border-zinc-700 
                                rounded-xl
                                text-xs sm:text-sm md:text-base
                                outline-none focus:border-blue-500
                                transition-all cursor-pointer
                                ">
                                <option disabled={true}>Pick a language</option>
                                {
                                    LANGUAGES.map((lang) => {
                                        return <option
                                            key={`native-${lang}`}
                                            value={lang.toLowerCase()}
                                        >
                                            {lang}
                                        </option>
                                    })
                                }
                            </select>
                        </fieldset>
                    </div>

                    {/* Location */}
                    <div>
                        <div className='flex items-center gap-1.5 sm:gap-2 mb-2'>
                            <IoLocationOutline className='text-blue-500 text-sm sm:text-base' />
                            <label htmlFor="location" className='text-xs sm:text-sm md:text-base font-medium'>Location</label>
                        </div>
                        <input
                            id="location"
                            value={formState?.location}
                            onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                            type="text"
                            placeholder='City, Country'
                            className='
                                w-full
                                py-2 sm:py-2.5 md:py-3 px-3 sm:px-4
                                bg-zinc-800 border-2 border-zinc-700
                                rounded-xl text-xs sm:text-sm md:text-base outline-none 
                                focus:border-blue-500 transition-all resize-none
                                placeholder:text-zinc-500
                            '/>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className='
                            w-full
                            bg-blue-600 hover:bg-blue-700
                            text-white cursor-pointer
                            py-2.5 sm:py-3 md:py-3.5 rounded-xl 
                            font-semibold text-sm sm:text-base md:text-lg
                            transition-all duration-300 hover:scale-[1.02]
                            active:scale-95 
                            mt-4 sm:mt-5 md:mt-6 shadow-lg
                        '>
                        {
                            isPending ?
                                <Loader />
                                : "Complete Profile ✓"
                        }

                    </button>
                </form>
            </div>
        </div >
    )
}

export default Onboarding