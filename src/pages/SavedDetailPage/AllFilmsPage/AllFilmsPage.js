import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'src/firebase/firebase';

import { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { UserContext } from 'src/context/UserContext';

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';
import { ModalContext } from 'src/context/ModalContext';
import SaveDetail from 'src/components/SaveDetail';
import { SaveContext } from 'src/context/SaveContext';

function AllFilmsPage() {
    const [films, setFilms] = useState([]);
    const { setLoading } = useContext(SaveContext);
    const currentUser = useContext(UserContext);

    useEffect(() => {
        const getFilms = async () => {
            setLoading(true);
            try {
                const ref = collection(db, 'films_saved', currentUser.uid, 'all_films');
                const q = query(ref, orderBy('createAt', 'desc'));

                onSnapshot(q, (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    console.log('data: ', data);

                    setFilms(data);
                    setLoading(false);
                });
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getFilms();
    }, [currentUser]);

    const menuItems = [
        {
            title: 'Select and remove',
            icon: <BsCircle />,
            onClick: (payload = {}) => {
                payload.setShowAction(true);
                payload.setShowCheck(true);
            },
        },
    ];
    return <SaveDetail pageName="all-films" menuItems={menuItems} films={films} />;
}

export default AllFilmsPage;
