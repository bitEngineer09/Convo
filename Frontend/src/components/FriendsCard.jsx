import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants/constants';
import { Link } from 'react-router-dom';

const FriendsCard = ({ friend }) => {

    return (
        <div
            className='
                w-90 h-50
                rounded-xl bg-base-200 hover:shadow-md
                my-5 p-4
                flex flex-col justify-around
                transition-shadow
            '>
            <div className='flex items-center gap-2'>
                <img src={friend?.profilePic} alt="user avatar" className='h-15' />
                <span className='text-xl font-medium'>{friend?.fullName}</span>
            </div>

            {/* Language section */}
            <p className='p-1 badge badge-secondary text-xs font-medium w-40 text-center rounded-2xl'>
                {getLanguageFlag(friend?.nativeLanguage)}
                <span>{`Native: ${friend?.nativeLanguage}`}</span>
            </p>
            <Link to={`/chat/${friend._id}`} className='btn btn-outline'>Message</Link>
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
                className='size-3'
            />
        )
    }
}