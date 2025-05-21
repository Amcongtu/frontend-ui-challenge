import { create } from "zustand";

type ThemeState = {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
    toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
    theme: typeof window !== "undefined" && localStorage.getItem("theme") === "dark" ? "dark" : "light",
    setTheme: (theme) => {
        localStorage.setItem("theme", theme);
        set({ theme });
        document.documentElement.classList.toggle("dark", theme === "dark");
    },
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.toggle("dark", newTheme === "dark");
            return { theme: newTheme };
        }),
}));
