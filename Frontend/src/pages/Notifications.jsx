import React from 'react'
import { FaUserFriends, FaRegBell } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { getAllFriendRequests, getAuthUser } from '../lib/api';
import { LANGUAGE_TO_FLAG } from '../constants/constants';
import { useAcceptRequests } from '../hooks/useAcceptRequests';
import NoFriendRequests from '../components/NoFriendRequests';
import Loader from '../components/Loader';
import NoNewNotifications from '../components/NoNewNotifications';

const Notifications = () => {
  const { data: friendRequests, isLoading: loadingRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getAllFriendRequests,
  });

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });

  const { isPending, error, accpetRequestMutation } = useAcceptRequests();

  const incommingRequests = friendRequests?.incommingRequests || [];
  const acceptedRequests = friendRequests?.acceptedRequests || [];

  if (incommingRequests.length === 0 && acceptedRequests.length === 0)
    return <NoNewNotifications />;

  return (
    <div className='px-3 sm:px-4 md:px-6 py-4'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-medium'>Notifications</h1>

      {/* Friend Requests */}
      <div className='min-h-50'>
        <p className='flex items-center gap-2 mt-4 font-medium text-base sm:text-lg'>
          <FaUserFriends className='text-primary text-lg sm:text-xl' /> Friend Requests
        </p>

        {/* Friend Request Notification Card */}
        <div className='w-full'>
          {
            loadingRequests ? (
              <div className='w-full flex h-40 items-center justify-center'>
                <Loader />
              </div>
            ) : (
              incommingRequests?.length === 0 ? (
                <NoFriendRequests />
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
                  {incommingRequests?.map((requestedUser) => (
                    <div
                      key={requestedUser?.sender?._id}
                      className='
                        w-full
                        flex flex-col sm:flex-row justify-between items-start sm:items-center 
                        rounded-xl gap-3 sm:gap-4
                        bg-base-200 hover:shadow-md transition-shadow 
                        mt-4 p-3 sm:p-4
                      '>
                      <div className='flex items-center gap-3 sm:gap-5 w-full sm:w-auto'>
                        <img 
                          src={requestedUser?.sender?.profilePic} 
                          alt="" 
                          className='size-14 sm:size-16 md:size-18 rounded-full flex-shrink-0' 
                        />
                        <div className='flex flex-col gap-1 sm:gap-2 min-w-0'>
                          <span className='text-sm sm:text-base font-medium truncate'>
                            {requestedUser?.sender?.fullName}
                          </span>
                          <p
                            className='
                              w-full max-w-[180px] p-1
                              flex items-center gap-1 sm:gap-2
                              badge badge-secondary 
                              text-xs font-medium
                              text-center rounded-2xl
                            '>
                            {getLanguageFlag(requestedUser?.sender?.nativeLanguage)}
                            <span className='truncate'>
                              {`Native: ${requestedUser?.sender?.nativeLanguage}`}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className='flex gap-2 sm:gap-3 w-full sm:w-auto'>
                        <button
                          onClick={() => accpetRequestMutation(requestedUser?._id)}
                          className='btn btn-soft btn-success btn-sm sm:btn-md flex-1 sm:flex-none'>
                          Accept
                        </button>
                        <button className='btn btn-soft btn-error btn-sm sm:btn-md flex-1 sm:flex-none'>
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )
          }
        </div>
      </div>

      {/* New Connections */}
      <p className='flex items-center gap-2 mt-6 sm:mt-8 font-medium text-base sm:text-lg'>
        <FaRegBell className='text-primary text-lg sm:text-xl' /> New Connections
      </p>

      {acceptedRequests?.length === 0 ? (
        <Loader />
      ) :
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-5'>
          {
            acceptedRequests?.map((notification) => {
              // Determine who the "other user" is
              const user =
                notification?.sender?._id === authUser?._id
                  ? notification?.recipient
                  : notification?.sender;

              return (
                <div key={notification?._id}>
                  <div
                    className='
                      w-full
                      flex flex-col sm:flex-row justify-between items-start sm:items-center 
                      rounded-xl gap-3 sm:gap-4
                      bg-base-200 hover:shadow-md transition-shadow 
                      mt-4 p-3 sm:p-4
                    '>
                    <div className='flex items-center gap-3 sm:gap-5 w-full sm:w-auto'>
                      <img 
                        src={user?.profilePic} 
                        alt="" 
                        className='size-14 sm:size-16 md:size-18 rounded-full flex-shrink-0' 
                      />
                      <div className='flex flex-col gap-1 sm:gap-2 min-w-0 flex-1'>
                        <span className='text-sm sm:text-base font-medium truncate'>
                          {user?.fullName}
                        </span>
                        <div className='flex flex-col gap-1'>
                          <p className='text-xs sm:text-sm font-medium truncate'>
                            {`${user?.fullName} is now your friend`}
                          </p>
                          <p className='flex items-center gap-1 text-xs text-base-content/70'>
                            <MdOutlineWatchLater />
                            <span>Recently</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className='flex gap-2 items-center badge badge-success text-xs sm:text-sm whitespace-nowrap'>
                      <IoChatboxOutline /> New Friend
                    </p>
                  </div>
                </div>
              );
            })
          }
        </div>
      }
    </div>
  );
}

export default Notifications;


// helper
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
    );
  }
  return null;
}