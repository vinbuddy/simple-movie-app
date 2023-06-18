import { createContext, useState, useEffect, useContext } from 'react';

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
import { UserContext } from './UserContext';

const auth = getAuth();

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const currentUser = useContext(UserContext);

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
                toast.success('Sign out successfully', {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            })
            .catch((error) => {});
    };

    const handleResetPassword = (email) => {
        setAuthLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Sent email successfully', {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            })
            .catch((error) => {
                setAuthLoading(false);

                setAuthError(error.code);

                toast.error('Sent email unsuccessfully', {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            })
            .finally(() => {
                setAuthLoading(false);
            });
    };

    const handleUpdateProfile = async (
        name = currentUser.displayName,
        photo = currentUser?.photoURL,
    ) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            });

            toast.success('Profile updated', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } catch (error) {
            toast.error('Cannot update your profile', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        // updateProfile(auth.currentUser, {
        //     displayName: name,
        //     photoURL: photo,
        // })
        //     .then(() => {
        //         // Profile updated!
        //         toast.success('Profile updated', {
        //             position: toast.POSITION.BOTTOM_CENTER,
        //         });
        //         return true;
        //     })
        //     .catch((error) => {
        //         toast.error('Cannot update your profile', {
        //             position: toast.POSITION.BOTTOM_CENTER,
        //         });
        //         return false;
        //     });
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
        handleUpdateProfile,
    };

    return <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
