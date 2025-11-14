import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getFriends } from '../lib/api';
import FriendsListCard from '../components/FriendsListCard';
import FriendProfileView from '../components/FriendProfileView';
import Loader from '../components/Loader';
import NoFriends from '../components/NoFriends';
import { FaUserFriends } from "react-icons/fa";

const Friends = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  return (
    <div className='h-full flex flex-col px-3 sm:px-4 md:px-6 py-4'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6'>
        Friends
      </h1>

      <div className='flex-1 flex gap-4 overflow-hidden'>
        {/* Left Section - Friends List */}
        <div
          className='
            w-full lg:w-2/5 xl:w-1/3
            flex flex-col bg-base-200
            rounded-xl
            border border-base-300
            overflow-hidden
          '>
          <div className='p-3 sm:p-4 border-b border-base-300'>
            <h2 className='text-lg sm:text-xl font-semibold'>All Friends ({friends.length})</h2>
          </div>
          
          <div className='flex-1 overflow-y-auto p-2 sm:p-3'>
            {loadingFriends ? (
              <div className='flex items-center justify-center h-full'>
                <Loader />
              </div>
            ) : friends.length === 0 ? (
              <NoFriends />
            ) : (
              <div className='flex flex-col gap-2'>
                {friends.map((friend) => (
                  <FriendsListCard
                    key={friend._id}
                    friend={friend}
                    isSelected={selectedFriend?._id === friend._id}
                    onClick={() => setSelectedFriend(friend)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Friend Profile */}
        <div className='hidden lg:flex flex-1 bg-base-200 rounded-xl border border-base-300 overflow-hidden'>
          {selectedFriend ? (
            <FriendProfileView friend={selectedFriend} />
          ) : (
            <div className='flex flex-col items-center justify-center w-full text-center p-8'>
              <div className='text-6xl opacity-30 mb-4'><FaUserFriends /></div>
              <p className='text-xl font-medium text-base-content/70'>
                Select a friend to view their profile
              </p>
              <p className='text-sm text-base-content/50 mt-2'>
                Click on any friend from the list to see their details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Friends