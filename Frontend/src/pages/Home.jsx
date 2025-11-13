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

  const { mutate: sendRequestMutation, isLoading: sendingRequest } = useMutation({
    mutationFn: sendFriendRequest,
    onMutate: async (userId) => {
      // optimistic: mark as sent
      setSentRequests(prev => new Set(prev).add(userId));
    },
    onError: (err, userId) => {
      // revert optimistic
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

  // helper to check if a recommended user already has outgoing request
  const hasOutgoingRequest = (userId) => {
    // check real outgoingRequests (from server) OR optimistic sentRequests
    const fromServer = outgoingRequests?.some(req => {
      // req.recipient might be populated object or id depending on server
      const rid = req?.recipient?._id || req?.recipient;
      return rid?.toString() === userId?.toString();
    });
    return sentRequests.has(userId) || fromServer;
  }

  const handleSendRequest = (userId) => {
    if (!userId) return;
    sendRequestMutation(userId);
  }

  return (
    <div className='flex flex-col '>
      {/* Friends */}
      <section className='min-h-60'>
        <div className='flex justify-between items-center mb-3'>
          <p className='text-3xl font-medium'>Your Friends</p>
          <Link to="/notifications" className='btn btn-outline btn-md'>
            <FaUserFriends />
            <p>Friend Requests</p>
          </Link>
        </div>

        {loadingFriends ? <Loader /> :
          friends.length == 0 ? <NoFriends /> :
            <div className='grid grid-cols-4'>
              {friends?.map((friend) => <FriendsCard key={friend?._id} friend={friend} />)}
            </div>
        }
      </section>

      {/* Recommended Users */}
      <section className='min-h-60'>
        <div>
          <p className='text-3xl font-medium mb-4'>Meet New Learners</p>
        </div>
        {loadingRecommendedUsers ? <Loader /> :
          recommendedUsers?.length == 0 ? <NoRecommendation /> :
            <div className='grid grid-cols-4 gap-4'>
              {recommendedUsers.map((user) =>
                <RecommendedUsers
                  key={user?._id}
                  user={user}
                  onSendRequest={() => handleSendRequest(user._id)}
                  isRequestSent={hasOutgoingRequest(user._id)}
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
