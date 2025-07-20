import axiosInstance from "./axios";

const contactService = {
    addContact: async (contactData) => {
        const res = await axiosInstance.post("/contacts/add", contactData);
        return res.data;
    },
    getContactList: async () => {
        const res = await axiosInstance.get("/contacts/");
        return res.data;
    },
    sendFriendRequest: async (requestData) => {
        const res = await axiosInstance.post("/contacts/friend-request", requestData);
        return res.data;
    },
    acceptFriendRequest: async (requestData) => {
        const res = await axiosInstance.post("/contacts/accept-request", requestData);
        return res.data;
    },
    getFriendRequests: async () => {
        const res = await axiosInstance.get("/contacts/friend-requests");
        return res.data;
    }
};

export default contactService;
