import axiosInstance from "./axios";

const groupService = {
    getGroups: async () => {
        const res = await axiosInstance.get("/groups");
        return res.data;
    },

    createGroup: async (groupData) => {
        const res = await axiosInstance.post("/groups", groupData);
        return res.data;
    },

    getGroupById: async (groupId) => {
        const res = await axiosInstance.get(`/groups/${groupId}`);
        return res.data;
    },

    addMemberToGroup: async ({ groupId, userId }) => {
        const res = await axiosInstance.post(`/groups/${groupId}/members`, { userId });
        return res.data;
    },

    removeMemberFromGroup: async ({ groupId, userId }) => {
        const res = await axiosInstance.delete(`/groups/${groupId}/members/${userId}`);
        return res.data;
    },

    deleteGroup: async (groupId) => {
        const res = await axiosInstance.delete(`/groups/${groupId}`);
        return res.data;
    }
};

export default groupService;
