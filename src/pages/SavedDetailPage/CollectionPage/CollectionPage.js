import { doc, getDoc, orderBy, query } from 'firebase/firestore';
import { db } from 'src/firebase/firebase';

import { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { UserContext } from 'src/context/UserContext';
import { SaveDetail } from 'src/components/SaveDetail';

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';
import { ModalContext } from 'src/context/ModalContext';

function CollectionPage() {
    const { collection: collectionName, id } = useParams();
    const [films, setFilms] = useState([]);

    const currentUser = useContext(UserContext);
    const { handleShowModal } = useContext(ModalContext);

    const menuItems = [
        {
            title: 'Edit collection',
            icon: <AiOutlineEdit />,
            onClick: () => {
                // Show update collection modal
                handleShowModal('update-collection');
            },
        },
        {
            title: 'Select and remove',
            icon: <BsCircle />,
            onClick: (payload = {}) => {
                payload.setShowAction(true);
                payload.setShowCheck(true);
            },
        },
        {
            title: 'Delete collection',
            icon: <AiOutlineDelete />,
            separate: true,
            onClick: () => {
                handleShowModal('confirm-delete');
            },
        },
    ];

    useEffect(() => {
        const getCollection = async () => {
            const ref = doc(db, 'films_saved', currentUser.uid, 'collection', id);
            const docSnap = await getDoc(ref);

            if (docSnap.exists()) {
                const collection = docSnap.data();

                setFilms(collection.data);
            } else {
                console.log('No such document');
            }
        };
        getCollection();
    }, [currentUser]);

    useEffect(() => {
        document.title = `${collectionName} | Simple Movie App`;
    }, [collectionName]);

    return (
        <>
            <SaveDetail
                setFilms={setFilms}
                collectionName={collectionName}
                collectionId={id}
                menuItems={menuItems}
                films={films}
            />
        </>
    );
}

export default CollectionPage;
