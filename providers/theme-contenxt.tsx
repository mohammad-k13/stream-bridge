"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Theme = "blue" | "purple" | "orange";
type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const themeContext = createContext<ThemeContextType>({
    theme: "blue",
    setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setCurrentTheme] = useState<Theme>("blue");

    const setTheme = (newTheme: Theme) => {
        setCurrentTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setCurrentTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    return (
        <themeContext.Provider
            value={{
                setTheme,
                theme,
            }}
        >
            {children}
        </themeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(themeContext);
    if (context) throw new Error("useTheme must be used within a ThemeProvider");

    return context as ThemeContextType;
};
