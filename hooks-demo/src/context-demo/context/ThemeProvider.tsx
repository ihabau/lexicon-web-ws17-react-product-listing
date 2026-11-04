import {type ReactNode, useState} from "react";
import {ThemeContext} from "./ThemeContext.ts";

export const ThemeProvider = ({children}: { children: ReactNode }) => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const handelToggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{isDarkMode, handelToggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
