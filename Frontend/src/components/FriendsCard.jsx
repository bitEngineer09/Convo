import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants/constants';
import { Link } from 'react-router-dom';

const FriendsCard = ({ friend }) => {

    return (
        <div
            className='
                w-full
                rounded-xl bg-base-200 hover:shadow-md
                my-3 sm:my-4 
                p-3 sm:p-4
                flex flex-col justify-between gap-3 sm:gap-4
                transition-shadow
                min-h-[170px] sm:min-h-[220px]
            '>
            <div className='flex items-center gap-2 sm:gap-3'>
                <img 
                    src={friend?.profilePic} 
                    alt="user avatar" 
                    className='size-12 sm:size-14 md:size-16 rounded-full object-cover flex-shrink-0' 
                />
                <span className='text-base sm:text-lg md:text-xl font-medium truncate'>
                    {friend?.fullName}
                </span>
            </div>

            {/* Language section */}
            <p className='
                p-1 sm:p-1.5
                badge badge-secondary 
                text-xs sm:text-sm font-medium 
                w-full max-w-[160px] sm:max-w-[180px]
                text-center rounded-2xl
                flex items-center justify-center gap-1
            '>
                {getLanguageFlag(friend?.nativeLanguage)}
                <span className='truncate'>{`Native: ${friend?.nativeLanguage}`}</span>
            </p>
            
            <Link 
                to={`/chat/${friend._id}`} 
                className='btn btn-outline btn-sm sm:btn-md w-full'
            >
                Message
            </Link>
        </div>
    )
}

export default FriendsCard;

function getLanguageFlag(language) {
    if (!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
        return (
            <img
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={`${langLower} flag`}
                className='size-3 sm:size-3.5 flex-shrink-0'
            />
        )
    }
}