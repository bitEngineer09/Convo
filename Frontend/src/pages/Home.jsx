import React, { useState } from 'react'
import {
  getAllOutgoingFriendRequests,
  getFriends,
  getRecommendedUsers,
  sendFriendRequest
} from '../lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaUserFriends } from "react-icons/fa";
import FriendsCard from '../components/FriendsCard';
import RecommendedUsers from '../components/RecommendedUsers';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import NoFriends from '../components/NoFriends';
import NoRecommendation from '../components/NoRecommendation';
import PageLoader from '../components/PageLoader';

const Home = () => {
  const queryClient = useQueryClient();
  const [sentRequests, setSentRequests] = useState(new Set()); // stores recipient IDs (strings)

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingRecommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingRequests = [], isLoading: outgoingRequestsLoading } = useQuery({
    queryKey: ["outgoingRequests"],
    queryFn: getAllOutgoingFriendRequests,
  });

  console.log(recommendedUsers)
  console.log(outgoingRequests)
  console.log(sentRequests)

  const { mutate: sendRequestMutation, isLoading: sendingRequest } = useMutation({
    mutationFn: sendFriendRequest,
    onMutate: async (userId) => {
      setSentRequests(prev => new Set(prev).add(userId));
    },
    onError: (err, userId) => {
      setSentRequests(prev => {
        const copy = new Set(prev);
        copy.delete(userId);
        return copy;
      });
      console.error("Failed to send friend request", err);
    },
    onSettled: () => {
      // refresh queries (outgoing & recommended & maybe friends)
      queryClient.invalidateQueries(["outgoingRequests"]);
      queryClient.invalidateQueries(["recommendedUsers"]);
      queryClient.invalidateQueries(["friends"]);
    }
  });

  const hasOutgoingRequest = (userId) => {
    const fromServer = outgoingRequests?.some(req => {
      const rid = req?.recipient?._id || req?.recipient;
      return rid?.toString() === userId?.toString();
    });
    return sentRequests.has(userId) || fromServer;
  }

  const handleSendRequest = (userId) => {
    if (!userId) return;
    sendRequestMutation(userId);
  }

  // Agar dono loading hai toh full page loader dikhao
  if (loadingFriends || loadingRecommendedUsers) {
    return (
      <div className='absolute inset-0'>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className='flex flex-col px-3 sm:px-4 md:px-6 py-4'>
      {/* Friends */}
      <section className='min-h-60 mb-6 sm:mb-8 '>
        <div
          className='
            flex flex-col sm:flex-row
            justify-between items-start sm:items-center
            gap-3 sm:gap-0
            mb-2
            '>
          <p className='text-2xl sm:text-3xl md:text-4xl font-medium'>Your Friends</p>
          <Link 
            to="/notifications" 
            className='btn btn-outline btn-sm sm:btn-md w-full sm:w-auto'
          >
            <FaUserFriends className='text-base sm:text-lg' />
            <span className='text-sm sm:text-base'>Friend Requests</span>
          </Link>
        </div>

        {friends.length === 0 ? <NoFriends /> :
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'>
            {friends?.map((friend) => <FriendsCard key={friend?._id} friend={friend} />)}
          </div>
        }
      </section>

      {/* Recommended Users */}
      <section className='min-h-60'>
        <div className='mb-4 sm:mb-5'>
          <p className='text-2xl sm:text-3xl md:text-4xl font-medium'>Meet New Learners</p>
        </div>
        {recommendedUsers?.length === 0 ? <NoRecommendation /> :
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'>
            {recommendedUsers.map((user) =>
              <RecommendedUsers
                key={user?._id}
                user={user}
                onSendRequest={() => handleSendRequest(user?._id)}
                isRequestSent={hasOutgoingRequest(user?._id)}
              />
            )
            }
          </div>
        }
      </section>
    </div>
  )
}

export default Home