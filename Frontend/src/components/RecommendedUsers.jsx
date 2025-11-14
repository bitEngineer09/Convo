import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants/constants';
import { Link } from 'react-router-dom';
import { FaMapPin, FaUserFriends } from 'react-icons/fa';
import { MdOutlineCheckCircleOutline } from "react-icons/md";

const RecommendedUsers = ({ user, onSendRequest, isRequestSent }) => {
  return (
    <div
      className='
        w-full
        rounded-xl bg-base-200 hover:shadow-md
        p-3 sm:p-4
        flex flex-col justify-between gap-3 sm:gap-4
        transition-shadow
        min-h-[200px] sm:min-h-[250px]
      '>
      <div className='flex items-center gap-3 sm:gap-4'>
        <img 
          src={user?.profilePic} 
          alt="user avatar" 
          className='size-12 sm:size-14 md:size-16 rounded-full object-cover shrink-0' 
        />
        <div className='flex flex-col items-start gap-1 sm:gap-2 min-w-0 flex-1'>
          <span className='text-base sm:text-lg md:text-xl font-medium truncate w-full'>
            {user?.fullName}
          </span>
          <p className='text-xs sm:text-sm flex items-center gap-1 text-base-content/70 truncate w-full'>
            <FaMapPin className='shrink-0' />
            <span className='truncate'>{user?.location}</span>
          </p>
        </div>
      </div>

      {/* Language section */}
      <p className='
        p-1 sm:p-1.5
        badge badge-secondary 
        text-xs sm:text-sm font-medium 
        w-full max-w-40 sm:max-w-[180px]
        text-center rounded-2xl
        flex items-center justify-center gap-1
      '>
        {getLanguageFlag(user?.nativeLanguage)}
        <span className='truncate'>{`Native: ${user?.nativeLanguage}`}</span>
      </p>

      {/* Bio section */}
      <p className='text-xs sm:text-sm text-base-content/80 line-clamp-2 sm:line-clamp-3'>
        {user?.bio}
      </p>

      {/* Friend req send btn */}
      {
        isRequestSent ?
          <button 
            disabled 
            className='btn btn-disabled btn-outline btn-sm sm:btn-md flex gap-2 items-center w-full text-xs sm:text-sm'
          >
            <MdOutlineCheckCircleOutline className='text-base sm:text-lg' /> 
            <span className='hidden sm:inline'>Friend Request sent</span>
            <span className='sm:hidden'>Request sent</span>
          </button> :
          <button
            onClick={onSendRequest}
            className='btn btn-primary btn-outline btn-sm sm:btn-md flex gap-2 items-center w-full text-xs sm:text-sm'
          >
            <FaUserFriends className='text-base sm:text-lg' /> 
            <span className='hidden sm:inline'>Send Friend Request</span>
            <span className='sm:hidden'>Send Request</span>
          </button>
      }
    </div>
  )
}

export default RecommendedUsers;

function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className='size-3 sm:size-3.5 shrink-0'
      />
    )
  }
}