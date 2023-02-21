import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [modalName, setModalName] = useState('');

    const handleShowModal = (modalName) => {
        setModalName(modalName);
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    const modalData = {
        modalName,
        showModal,
        setModalName,
        handleShowModal,
        handleHideModal,
    };

    return <ModalContext.Provider value={modalData}>{children}</ModalContext.Provider>;
}

export { ModalProvider, ModalContext };
