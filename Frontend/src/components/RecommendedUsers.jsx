import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants/constants';
import { Link } from 'react-router-dom';
import { FaMapPin, FaUserFriends } from 'react-icons/fa';
import { MdOutlineCheckCircleOutline } from "react-icons/md";

const RecommendedUsers = ({ user, onSendRequest, isRequestSent }) => {
  return (
    <div
      className='
                w-95 min-h-65
                rounded-xl bg-base-200 hover:shadow-md
                my-5 p-4
                flex flex-col justify-around
                transition-shadow
            '>
      <div className='flex items-center gap-4'>
        <img src={user?.profilePic} alt="user avatar" className='h-15' />
        <div className='flex flex-col items-start gap-2'>
          <span className='text-xl font-medium'>{user?.fullName}</span>
          <p className='text-sm flex items-center'><FaMapPin />{user?.location}</p>
        </div>
      </div>

      {/* Language section */}
      <p className='p-3 badge badge-secondary text-xs font-medium w-40 text-center rounded-2xl'>
        {getLanguageFlag(user?.nativeLanguage)}
        <span>{`Native: ${user?.nativeLanguage}`}</span>
      </p>

      {/* Bio section */}
      <p>{user?.bio}</p>

      {/* Friend req send btn */}
      {
        isRequestSent ?
          <button disabled className='btn btn-disable btn-outline flex gap-3 items-center'>
            <MdOutlineCheckCircleOutline /> Friend Request sent
          </button> :
          <button
            onClick={onSendRequest}
            className='btn btn-primary btn-outline flex gap-3 items-center'>
            <FaUserFriends /> Send Friend Request
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
        className='size-3'
      />
    )
  }
}