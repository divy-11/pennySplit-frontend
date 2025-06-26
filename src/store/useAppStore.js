import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAppStore = create(
    persist((set) => ({
        user: null,

        login: (userData) => set({ user: userData }),

        logout: () => set({ user: null }),
        setUser: (e) => set({ user: e })
    }), {
        name: 'auth-storage',
    })
);


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
