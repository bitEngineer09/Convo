import { axiosInstance } from "./axios";


// get auth user
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error("Error in getAuthUser:", error);
    throw error;
  }
};

// get user data
export const getUserData = async () => {
  try {
    const res = await axiosInstance.get("/auth/getUserData");
    return res.data;
  } catch (error) {
    console.error("Error in getUserData:", error);
    throw error;
  }
};

// signup / login
export const auth = async (newUser, signupData, loginData) => {
  try {
    const formData = newUser ? signupData : loginData;
    const endpoint = newUser ? "/auth/signup" : "/auth/login";

    const res = await axiosInstance.post(endpoint, formData);
    console.log("Auth success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Auth error:", error);
    throw error;
  }
};

// logout
export const logout = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error in logout:", error);
    throw error;
  }
};

// complete onboarding
export const completeOnboarding = async (formData) => {
  try {
    const res = await axiosInstance.post("/auth/onboarding", formData);
    return res.data;
  } catch (error) {
    console.error("Error in completeOnboarding:", error);
    throw error;
  }
};

// get friends
export const getFriends = async () => {
  try {
    const res = await axiosInstance.get("/user/friends");
    console.log("getFriends data", res.data.friends);
    return res.data.friends;
  } catch (error) {
    console.log("Error in getFriends:", error);;
    throw error;
  }
}

// get recommended users
export const getRecommendedUsers = async () => {
  try {
    const res = await axiosInstance.get("/user/");
    // console.log("getRecommendedUsers data", res.data.recommendedUsers);
    return res.data.recommendedUsers;
  } catch (error) {
    console.log("Error in getRecommendedUsers: ", error);
    throw error;
  }
}

// get all-outgoing friend requests
export const getAllOutgoingFriendRequests = async () => {
  try {
    const res = await axiosInstance.get("/user/outgoing-requests");
    // console.log("getAllOutgoingFriendRequests data: ", res);
    return res.data.outgoingRequests;
  } catch (error) {
    console.log("Error in getAllOutgoingFriendRequests: ", error);
    throw error;
  }
}

// send friend requests
export const sendFriendRequest = async (id) => {
  try {
    const res = await axiosInstance.post(`/user/friend-request/${id}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error in sendFriendRequests", error);
    throw error;
  }
}

// get all friend requests
export const getAllFriendRequests = async () => {
  try {
    const res = await axiosInstance.get("/user/friend-requests");
    // console.log("getAllFriendRequests data", res.data);
    return res.data;
  } catch (error) {
    console.log("Error in getAllFriendRequests: ", error.message);
    throw error;
  }
}

// accpet friend requests
export const accpetFriendRequest = async (id) => {
  try {
    const res = await axiosInstance.put(`/user/friend-request/${id}/accept`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error in acceptFriendRequest: ", error.message);
    throw error;
  }
}

// get stream token
export const getStreamToken = async () => {
  try {
    const res = await axiosInstance.get("/chat/token");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error in getStreamToken: ", error);
    throw error;
  }
}

// reject friend request
export const rejectFriendRequest = async (requestId) => {
  try {
    const res = await axiosInstance.delete(`/user/reject-request/${requestId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    throw error;
  }
}

// remove friend
export const removeFriend = async (id) => {
  try {
    const res = await axiosInstance.delete(`/user/remove-friend/${id}`)
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error in remove friend: ", removeFriend);
    throw error;
  }
}