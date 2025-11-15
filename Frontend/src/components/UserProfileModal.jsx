import React from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaTimes } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { LANGUAGE_TO_FLAG } from '../constants/constants'

const UserProfileModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  const date = new Date(user?.createdAt);
  const joinedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const getLanguageFlag = (language) => {
    if (!language) return null;
    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];
    
    if (countryCode) {
      return (
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt={`${langLower} flag`}
          className='size-4'
        />
      );
    }
    return null;
  };

  console.log(user)

  return (
    <>
      {/* Backdrop */}
      <div 
        className='fixed inset-0 bg-black/50 z-40 backdrop-blur-sm'
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div 
          className='
            w-full max-w-2xl
            bg-base-100
            rounded-2xl
            shadow-2xl
            max-h-[90vh]
            overflow-y-auto
            animate-in fade-in zoom-in duration-200
          '
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className='sticky top-0 bg-base-100 z-10 flex justify-end p-4 border-b border-base-300'>
            <button 
              onClick={onClose}
              className='btn btn-sm btn-circle btn-ghost'
            >
              <FaTimes className='text-lg' />
            </button>
          </div>

          {/* Content */}
          <div className='p-4 sm:p-6 md:p-8'>
            {/* Image section */}
            <div className='flex flex-col items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-base-300'>
              <div className='relative'>
                <img 
                  src={user?.profilePic} 
                  alt={user?.fullName}
                  className='size-24 sm:size-32 md:size-40 rounded-full object-cover ring-4 ring-primary/20' 
                />
                <div className='absolute bottom-0 right-0 size-6 sm:size-8 bg-success rounded-full border-4 border-base-100'></div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-center'>
                  {user?.fullName}
                </h2>
                {user?.email && (
                  <p className='text-xs sm:text-sm text-base-content/70 flex items-center gap-1'>
                    <MdEmail /> {user?.email}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Details section */}
            <div className='flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6'>
              {/* Bio */}
              {user?.bio && (
                <div className='bg-base-200 rounded-xl p-3 sm:p-4'>
                  <p className='text-xs sm:text-sm font-semibold text-base-content/70 mb-1 sm:mb-2 uppercase tracking-wide'>
                    Bio
                  </p>
                  <p className='text-sm sm:text-base text-base-content'>
                    {user?.bio}
                  </p>
                </div>
              )}

              {/* Languages */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {/* Native Language */}
                {user?.nativeLanguage && (
                  <div className='bg-base-200 rounded-xl p-3 sm:p-4'>
                    <p className='text-xs sm:text-sm font-semibold text-base-content/70 mb-2 uppercase tracking-wide'>
                      Native Language
                    </p>
                    <div className='flex items-center gap-2'>
                      {getLanguageFlag(user?.nativeLanguage)}
                      <p className='text-sm sm:text-base text-base-content font-medium'>
                        {user?.nativeLanguage}
                      </p>
                    </div>
                  </div>
                )}

                {/* Learning Language */}
                {user?.learningLanguage && (
                  <div className='bg-base-200 rounded-xl p-3 sm:p-4'>
                    <p className='text-xs sm:text-sm font-semibold text-base-content/70 mb-2 uppercase tracking-wide'>
                      Learning Language
                    </p>
                    <div className='flex items-center gap-2'>
                      {getLanguageFlag(user?.learningLanguage)}
                      <p className='text-sm sm:text-base text-base-content font-medium'>
                        {user?.learningLanguage}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Location */}
              {user?.location && (
                <div className='bg-base-200 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3'>
                  <FaMapMarkerAlt className='text-primary text-lg sm:text-xl shrink-0' />
                  <div>
                    <p className='text-xs sm:text-sm font-semibold text-base-content/70 uppercase tracking-wide'>
                      Location
                    </p>
                    <p className='text-sm sm:text-base text-base-content'>
                      {user?.location}
                    </p>
                  </div>
                </div>
              )}

              {/* Joined Date */}
              {user?.createdAt && (
                <div className='bg-base-200 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3'>
                  <FaCalendarAlt className='text-primary text-lg sm:text-xl shrink-0' />
                  <div>
                    <p className='text-xs sm:text-sm font-semibold text-base-content/70 uppercase tracking-wide'>
                      Joined
                    </p>
                    <p className='text-sm sm:text-base text-base-content'>
                      {joinedDate}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileModal;