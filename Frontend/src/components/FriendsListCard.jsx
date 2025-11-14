import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants/constants';

const FriendsListCard = ({ friend, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
                w-full
                rounded-xl hover:shadow-md
                p-3 sm:p-4
                flex items-center gap-3
                transition-all cursor-pointer
                ${isSelected 
                    ? 'bg-primary/10 border-2 border-primary' 
                    : 'bg-base-300 hover:bg-base-300/70'
                }
            `}>
            <img 
                src={friend?.profilePic} 
                alt="user avatar" 
                className='size-12 sm:size-14 rounded-full object-cover shrink-0' 
            />
            <div className='flex-1 min-w-0'>
                <p className='text-sm sm:text-base font-medium truncate'>
                    {friend?.fullName}
                </p>
                <div className='flex items-center gap-1 mt-1'>
                    {getLanguageFlag(friend?.nativeLanguage)}
                    <span className='text-xs text-base-content/70 truncate'>
                        {friend?.nativeLanguage}
                    </span>
                </div>
            </div>
            {isSelected && (
                <div className='size-2 bg-primary rounded-full shrink-0'></div>
            )}
        </div>
    )
}

export default FriendsListCard;

function getLanguageFlag(language) {
    if (!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
        return (
            <img
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={`${langLower} flag`}
                className='size-3 shrink-0'
            />
        )
    }
}