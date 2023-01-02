import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const themeStorage = localStorage.getItem('currentTheme') ?? 'light';
        return themeStorage;
    });

    const [isDark, setDark] = useState(false);

    const handleToggle = () => {
        // change new theme when click
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        // save on localStorage
        localStorage.setItem('currentTheme', newTheme);

        // set theme base on localStorage
        setTheme(localStorage.getItem('currentTheme'));
    };

    useEffect(() => {
        // Check if localStorage null first time -> set theme 'light' default
        if (!localStorage.getItem('currentTheme')) {
            localStorage.setItem('currentTheme', theme);
        }
    }, []);

    // set base on theme
    useEffect(() => {
        if (localStorage.getItem('currentTheme') === 'dark') {
            document.body.dataset.theme = localStorage.getItem('currentTheme');
            setDark(true);
        } else {
            document.body.dataset.theme = localStorage.getItem('currentTheme');
            setDark(false);
        }
    }, [theme]);

    const themeData = {
        theme,
        isDark,
        handleToggle,
    };

    return <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
