import { doc, getDoc } from 'firebase/firestore';
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
            onClick: function () {
                // Show update collection modal
                handleShowModal('update-collection');
            },
        },
        {
            title: 'Select and remove',
            icon: <BsCircle />,
        },
        {
            title: 'Delete collection',
            icon: <AiOutlineDelete />,
            separate: true,
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

    return (
        <>
            <SaveDetail
                collectionName={collectionName}
                collectionId={id}
                menuItems={menuItems}
                films={films}
            />
        </>
    );
}

export default CollectionPage;
