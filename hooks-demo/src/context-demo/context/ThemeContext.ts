import {createContext} from "react";

export interface ThemeContextProps {
    isDarkMode: boolean;
    handelToggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);