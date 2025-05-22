import { create } from 'zustand';

export type User = {
    email: string;
    role: string;
    name: string;
    avatar?: string;
    phone?: string;
    address?: string;
    token?: string;
    id?: string;
    userName?: string;
};

type UserState = {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoggedIn: false,
    login: (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");

        set({
            user: userData,
            isLoggedIn: true,
        });
    },
    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        set({
            user: null,
            isLoggedIn: false,
        });
    },
}));
