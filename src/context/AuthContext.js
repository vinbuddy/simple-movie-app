import { createContext, useState, useEffect } from 'react';

import {
    getAuth,
    signOut,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth';

import { app } from 'src/firebase/firebase';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth();

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState('');

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const handleSignInGoogle = (e) => {
        e.preventDefault();

        signInWithPopup(auth, googleProvider)
            .then((result) => {})
            .catch((error) => setAuthError(error.code));
    };

    const handleSignInFacebook = (e) => {
        e.preventDefault();

        signInWithPopup(auth, facebookProvider)
            .then((result) => {})

            .catch((error) => setAuthError(error.code));
    };

    const handleSignInGoogleEmailPassword = (email, password) => {
        setAuthLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => setAuthError(error.code))
            .finally(() => setAuthLoading(false));
    };

    const handleCreateAccount = (name, email, password) => {
        setAuthLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return updateProfile(auth.currentUser, {
                    displayName: name,
                });
            })
            .then((res) => console.log(res))
            .catch((error) => setAuthError(error.code))
            .finally(() => setAuthLoading(false));
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // console.log('user sign out');
            })
            .catch((error) => {});
    };

    const handleResetPassword = (email) => {
        setAuthLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success(`Sent email successfully`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            })
            .catch(() => {
                toast.error('Sent email unsuccessfully', {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            })
            .finally(() => {
                setAuthLoading(false);
            });
    };

    const AuthData = {
        authLoading,
        authError,
        handleCreateAccount,
        handleSignInGoogleEmailPassword,
        handleSignInGoogle,
        handleSignInFacebook,
        handleSignOut,
        handleResetPassword,
    };

    return <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
