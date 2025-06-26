import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const useAppStore = create(
    persist((set) => ({
        user: null,

        login: (userData) => set({ user: userData }),

        logout: () => set({ user: null }),
        setUser: (e) => set({ user: e })
    }), {
        name: 'auth-storage',
    })
)