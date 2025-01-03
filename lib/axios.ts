import axios from "axios";
import { deleteCookie, getCookie } from "./cookies";

// for client-side fetching
export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        if (typeof window !== "undefined") {
            const token = getCookie("sessionToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response error handling
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 403) {
            deleteCookie("sessionToken")
            window.location.href = "/login";
        }

        if (error.response) {
            console.error("Error:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("No response received", error.request);
        } else {
            console.error("Error setting up request", error.message);
        }
        return Promise.reject(error);
    }
);

// for server-side fetching
export const axiosServer = axios.create({
    baseURL: process.env.API_URL || "https://your-api.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add response error handling for server-side as well
axiosServer.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 403) {
            // Handle 403 error for server-side requests
            console.error("Access denied. Please login again.");
            // Optionally, handle server-side redirects or other actions
        }
        if (error.response) {
            console.error("Error:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("No response received", error.request);
        } else {
            console.error("Error setting up request", error.message);
        }
        return Promise.reject(error);
    }
);
