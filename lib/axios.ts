import axios from "axios";
import { deleteCookie, getCookie } from "./cookies";
import { toast } from "sonner";

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
        const message = error.response?.data?.message || "Something went wrong";

        if (error.response) {
            if (error.response.status === 403) {
                deleteCookie("sessionToken");
                window.location.href = "/auth/login";
            }

            if (error.response.status === 500) {
                toast.error(message || "Internal Server Error");
            }

            if (error.response.status === 404) {
                toast.error(message || "Resource Not Found");
            }

            console.error("Error:", error.response.status, error.response.data);
        } else if (error.request) {
            if (error.message === "Failed to fetch") {
                toast.error("Network error: Unable to reach the server. Please check your connection.");
            } else {
                console.error("No response received", error.request);
                toast.error("No response from the server. Please try again later.");
            }
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
            console.error("Access denied. Please login again.");
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
