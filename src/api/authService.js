import { useAppStore } from "../store/useAppStore";
import axiosInstance from "./axios";
const authService = {
    register: async (credentials) => {
        const res = await axiosInstance.post("/auth/users/register", credentials);
        return res;
    },
    login: async (credentials) => {
        const res = await axiosInstance.post("/auth/users/login", credentials);
        return res;
    },
    logout: async () => {
        const res = await axiosInstance.get("/auth/users/logout");

        await useAppStore.getState().logout();
        return res;
    },
    verifyToken: async () => {
        const res = await axiosInstance.get("/auth/users/verify");
        return res;
    },
    resetPassword: async (payload) => {
        const res = await axiosInstance.post("/auth/users/reset-password", payload);
        return res;
    },
    getAllUser: async () => {
        const res = await axiosInstance.get("/auth/users/get-all-users");
        return res;
    }
}

export default authService;