import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));


export const useGroupStore = create(
    persist(
        (set) => ({
            groups: [],
            setGroup: (data) => set({ groups: data }),
        }),
        {
            name: 'group-storage',
            partialize: (state) => ({ groups: state.groups }),
        }
    )
);
