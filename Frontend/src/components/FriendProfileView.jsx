import React from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaGlobeAmericas } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { LANGUAGE_TO_FLAG } from '../constants/constants'

const FriendProfileView = ({ friend }) => {
    const { fullName, profilePic, bio, location, createdAt, email, nativeLanguage, learningLanguage } = friend;
    console.log(friend)
    const date = new Date(createdAt);
    const joinedDate = date?.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div className='w-full overflow-y-auto'>
            <div className='p-4 sm:p-6 md:p-8'>
                {/* Header Section */}
                <div className='flex flex-col items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-base-300'>
                    <div className='relative'>
                        <img 
                            src={profilePic} 
                            alt={fullName}
                            className='size-24 sm:size-32 md:size-40 rounded-full object-cover ring-4 ring-primary/20' 
                        />
                        <div className='absolute bottom-0 right-0 size-6 sm:size-8 bg-success rounded-full border-4 border-base-200'></div>
                    </div>
                    <div className='flex flex-col items-center gap-1 w-full'>
                        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-center'>
                            {fullName}
                        </h2>
                        {email && (
                            <p className='text-xs sm:text-sm text-base-content/70 flex items-center gap-1'>
                                <MdEmail /> {email}
                            </p>
                        )}
                    </div>

                    {/* Message Button */}
                    <Link 
                        to={`/chat/${friend._id}`}
                        className='btn btn-primary w-full gap-2'
                    >
                        <IoChatboxEllipsesOutline className='text-lg' />
                        Send Message
                    </Link>
                </div>

                {/* Details Section */}
                <div className='flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6'>
                    {/* Bio */}
                    {bio && (
                        <div className='bg-base-300/50 rounded-xl p-3 sm:p-4'>
                            <p className='text-xs sm:text-sm font-semibold text-base-content/70 mb-1 sm:mb-2 uppercase tracking-wide'>
                                Bio
                            </p>
                            <p className='text-sm sm:text-base text-base-content'>
                                {bio}
                            </p>
                        </div>
                    )}

                    {/* Native Language */}
                    {nativeLanguage && (
                        <div className='bg-base-300/50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3'>
                            <FaGlobeAmericas className='text-primary text-lg sm:text-xl shrink-0' />
                            <div className='flex-1'>
                                <p className='text-xs sm:text-sm font-semibold text-base-content/70 uppercase tracking-wide'>
                                    Native Language
                                </p>
                                <div className='flex items-center gap-2 mt-1'>
                                    {getLanguageFlag(nativeLanguage)}
                                    <p className='text-sm sm:text-base text-base-content'>
                                        {nativeLanguage}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Learning Language */}
                    {learningLanguage && (
                        <div className='bg-base-300/50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3'>
                            <FaGlobeAmericas className='text-secondary text-lg sm:text-xl shrink-0' />
                            <div className='flex-1'>
                                <p className='text-xs sm:text-sm font-semibold text-base-content/70 uppercase tracking-wide'>
                                    Learning Language
                                </p>
                                <div className='flex items-center gap-2 mt-1'>
                                    {getLanguageFlag(learningLanguage)}
                                    <p className='text-sm sm:text-base text-base-content'>
                                        {learningLanguage}
                                    </p>
                                </div>
                            </div>
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
                                <p className='text-sm sm:text-base text-base-content'>
                                    {location}
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default FriendProfileView;

function getLanguageFlag(language) {
    if (!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
        return (
            <img
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={`${langLower} flag`}
                className='size-4 shrink-0'
            />
        )
    }
}