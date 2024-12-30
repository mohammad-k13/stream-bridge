import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.API,
    withCredentials: true,
});
