import { StorageKeys } from "../utils/constants";
import axiosInstance from "./axios";
const authService = {
    register: async (credentials) => {
        const res = await axiosInstance.post("/auth/users/register", credentials);
        return res.data;
    },
    login: async (credentials) => {
        const res = await axiosInstance.post("/auth/users/login", credentials);
        if (res.data?.accessToken) {
            localStorage.setItem(StorageKeys.ACCESS_TOKEN, res.data?.accessToken);
        }
        if (res.data?.refreshToken) {
            localStorage.setItem(StorageKeys.REFRESH_TOKEN, res.data?.refreshToken);
        }
        return res;
    },
    logout: async () => {
        const res = await axiosInstance.get("/auth/users/logout");
        if (res.data?.accessToken) {
            localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
        }
        if (res.data?.refreshToken) {
            localStorage.removeItem(StorageKeys.REFRESH_TOKEN, res.data?.refreshToken);
        }
        return res;
    },
    verify: async () => {
        const res = await axiosInstance.get("/auth/users/verify");
        return res;
    },
}

export default authService;