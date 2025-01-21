import axios from "axios";
import { BASE_URL } from "./constants";
const options = {
    withCredentials: true,
     headers:{'Authorization': `Bearer ${token}`}
  }

export const getUserData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/profile`, options);
        return response.data.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
}

export const getFeedData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/feed`, options);
        return response?.data?.users;
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
}

export const getConnectionReceived = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/request/received`, options);
        return res?.data?.connectionRequest;
    } catch (error) {
        console.error('Error fetching connections:', error);
        
    }
}

export const getLoggedInUserData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/profile`,  options);
        return res?.data;
    } catch (error) {
        console.error('Error fetching logged in user data :', error); 
    }
}

export const getAllConnection = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/all/connections`, options);
        return res?.data?.data;
    } catch (error) {
        console.error('Error fetching connections:', error); 
        
    }
}

export const getUserPost = async (userId) => {
    try {
        const res = await axios.get(`${BASE_URL}/user/post/${userId}`,options);
        return res?.data?.data;
    } catch (error) {
        console.error('Error fetching post:', error); 
        
    }
}

export const getChats = async (toUserId) => {
    try {
        const res = await axios.get(`${BASE_URL}/chat/${toUserId}`, options);
        return res?.data;
    } catch (error) {
        
    }
}
