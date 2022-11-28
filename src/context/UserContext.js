import { createContext, useState, useEffect } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const auth = getAuth();

    // Current User 👇
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                // User is signed out
                setCurrentUser(null);
            }
        });
    }, []);

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
