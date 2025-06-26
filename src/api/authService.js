import { useAppStore } from "../store/useAppStore";
import { StorageKeys } from "../utils/constants";
import axiosInstance from "./axios";
const authService = {
    register: async (credentials) => {
        const res = await axiosInstance.post("/auth/users/register", credentials);
        return res;
    },
    login: async (credentials) => {
        const res = await axiosInstance.post("/auth/users/login", credentials);


        // if (res.data?.accessToken) {
        //     localStorage.setItem(StorageKeys.ACCESS_TOKEN, res.data?.accessToken);
        // }
        // if (res.data?.refreshToken) {
        //     localStorage.setItem(StorageKeys.REFRESH_TOKEN, res.data?.refreshToken);
        // }
        useAppStore.getState().login(res)
        return res;
    },
    logout: async () => {
        const res = await axiosInstance.get("/auth/users/logout");
        console.log(res)
        // if (res.data.accessToken) {
        //     localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
        // }
        // if (res.data.refreshToken) {
        //     localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
        // }
        await useAppStore.getState().logout();
        return res;
    },
    verify: async () => {
        const res = await axiosInstance.get("/auth/users/verify");
        return res;
    },
}

export default authService;