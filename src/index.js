import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyles from './components/GlobalStyles';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ModalProvider } from './context/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <GlobalStyles>
        <ThemeProvider>
            <UserProvider>
                <AuthProvider>
                    <SkeletonTheme
                        duration={1}
                        highlightColor="var(--nav-background)"
                        baseColor="var(--app-background)"
                    >
                        <ModalProvider>
                            <App />
                        </ModalProvider>
                    </SkeletonTheme>
                </AuthProvider>
            </UserProvider>
        </ThemeProvider>
    </GlobalStyles>,
    //  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
