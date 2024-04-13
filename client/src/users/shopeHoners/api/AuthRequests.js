import axios from "axios";
import { BASE_URL } from "../utils/Constance";



// import API from '../utils/axios.jsx'
// export const signUp = (formData) => API.post('/user', formData);


export const signUp = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user`,formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const logIn = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user`,formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
