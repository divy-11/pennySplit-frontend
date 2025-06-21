import axiosInstance from "./axios";

const expenseService = {
    createExpense: async (expenseData) => {
        const res = await axiosInstance.post("/expense", expenseData);
        return res.data;
    },

    getExpensesByGroup: async (groupId) => {
        const res = await axiosInstance.get(`/expense/group/${groupId}`);
        return res.data;
    },

    getExpenseById: async (expenseId) => {
        const res = await axiosInstance.get(`/expense/${expenseId}`);
        return res.data;
    },

    deleteExpense: async (expenseId) => {
        const res = await axiosInstance.delete(`/expense/${expenseId}`);
        return res.data;
    }
};

export default expenseService;
