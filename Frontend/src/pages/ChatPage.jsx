import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthUser } from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window
} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { useUserData } from '../hooks/useUserData';
import toast from 'react-hot-toast';
import ChatLoader from '../components/ChatLoader';
import CallButton from '../components/CallButton';

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();
  const { userData } = useUserData();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser && !!userData
  });

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I have started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video vall link sent successfully");
    }
  }

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser || !targetUserId) return;

      try {
        console.log("Stream chat client is initializing...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({
          id: authUser.id,
          name: userData?.fullName,
          image: userData?.profilePic,
        }, tokenData.token);

        // Ensure both user IDs are strings and consistent
        const currentUserId = String(authUser.id);
        const targetUserIdStr = String(targetUserId);

        const channelId = [currentUserId, targetUserIdStr].sort().join("-");

        const currentChannel = client.channel("messaging", channelId, {
          members: [currentUserId, targetUserIdStr], // Ensure both are strings
        });

        await currentChannel.watch();

        setChatClient(client);
        setChannel(currentChannel);
      } catch (error) {
        console.error("Error initializing chat: ", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // Cleanup function
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [tokenData, targetUserId, authUser, userData, STREAM_API_KEY]);

  if (loading || !chatClient || !channel) return <ChatLoader />

  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='absolute right-10 top-4'>
            <CallButton handleVideoCall={handleVideoCall} />
          </div>
          <Window className="bg-secondory">
            <ChannelHeader />
            <MessageList className="bg-primary" />
            <MessageInput focus />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage