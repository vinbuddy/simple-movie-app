import { createContext, useState, useEffect } from 'react';

const SaveContext = createContext();

function SaveProvider({ children }) {
    const [save, setSave] = useState(false);

    const handleToggleSave = () => {
        setSave(!save);
    };

    const saveData = {
        save,
        handleToggleSave,
    };

    return <SaveContext.Provider value={saveData}>{children}</SaveContext.Provider>;
}

export { SaveProvider, SaveContext };
