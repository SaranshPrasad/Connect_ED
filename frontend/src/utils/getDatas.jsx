import axios from "axios";
import { BASE_URL } from "./constants";

export const getUserData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/profile`, { withCredentials: true });
        return response.data.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
}

export const getFeedData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
        return response?.data?.users;
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
}

export const getConnectionReceived = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/request/received`,  {withCredentials:true});
        return res?.data?.connectionRequest;
    } catch (error) {
        console.error('Error fetching connections:', error);
        
    }
}

export const getLoggedInUserData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/profile`,  {withCredentials:true});
        return res?.data?.data;
    } catch (error) {
        console.error('Error fetching connections:', error); 
    }
}

export const getAllConnection = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/all/connections`, {withCredentials: true});
        return res?.data?.data;
    } catch (error) {
        
    }
}