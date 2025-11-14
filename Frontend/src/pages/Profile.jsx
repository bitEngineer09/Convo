import React from 'react'
import { useUserData } from '../hooks/useUserData'
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const Profile = () => {

    const { userData } = useUserData();
    const { fullName, profilePic, bio, location, createdAt, email } = userData;
    const date = new Date(createdAt);
    const joinedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div className='px-3 sm:px-4 md:px-6 py-4'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-8'>
                Profile
            </h1>
            
            <div className='flex items-center justify-center p-4'>
                <div
                    className='
                        w-full max-w-2xl
                        flex flex-col gap-4 sm:gap-6
                        bg-base-200
                        rounded-2xl
                        p-4 sm:p-6 md:p-8
                        border border-base-300
                        shadow-lg
                    '>

                    {/* Image section */}
                    <div className='flex flex-col items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-base-300'>
                        <div className='relative'>
                            <img 
                                src={profilePic} 
                                alt={fullName}
                                className='size-24 sm:size-32 md:size-40 rounded-full object-cover ring-4 ring-primary/20' 
                            />
                            <div className='absolute bottom-0 right-0 size-6 sm:size-8 bg-success rounded-full border-4 border-base-200'></div>
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-center'>
                                {fullName}
                            </h2>
                            {email && (
                                <p className='text-xs sm:text-sm text-base-content/70 flex items-center gap-1'>
                                    <MdEmail /> {email}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Profile Details section */}
                    <div className='flex flex-col gap-3 sm:gap-4'>
                        {/* Bio */}
                        {bio && (
                            <div className='bg-base-300/50 rounded-xl p-3 sm:p-4'>
                                <p className='text-xs sm:text-sm font-semibold text-base-content/70 mb-1 sm:mb-2 uppercase tracking-wide'>
                                    Bio
                                </p>
                                <p className='text-sm sm:text-base md:text-lg text-base-content'>
                                    {bio}
                                </p>
                            </div>
                        )}

                        {/* Location */}
                        {location && (
                            <div className='bg-base-300/50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3'>
                                <FaMapMarkerAlt className='text-primary text-lg sm:text-xl shrink-0' />
                                <div>
                                    <p className='text-xs sm:text-sm font-semibold text-base-content/70 uppercase tracking-wide'>
                                        Location
                                    </p>
                                    <p className='text-sm sm:text-base md:text-lg text-base-content'>
                                        {location}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Joined Date */}
                        <div className='bg-base-300/50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3'>
                            <FaCalendarAlt className='text-primary text-lg sm:text-xl shrink-0' />
                            <div>
                                <p className='text-xs sm:text-sm font-semibold text-base-content/70 uppercase tracking-wide'>
                                    Joined
                                </p>
                                <p className='text-sm sm:text-base md:text-lg text-base-content'>
                                    {joinedDate}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Button - Optional */}
                    <button className='btn btn-primary w-full mt-2'>
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile