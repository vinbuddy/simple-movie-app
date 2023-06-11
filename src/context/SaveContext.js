import { createContext, useState, useEffect, useContext } from 'react';
import { db } from 'src/firebase/firebase';
import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    updateDoc,
    arrayUnion,
    doc,
    deleteDoc,
    arrayRemove,
} from 'firebase/firestore';
import { UserContext } from 'src/context/UserContext';
import { toast } from 'react-toastify';

const SaveContext = createContext();

function SaveProvider({ children }) {
    const currentUser = useContext(UserContext);
    const [collections, setCollections] = useState([]);
    const [allFilms, setAllFilms] = useState([]);
    const [collectionInput, setCollectionInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const createCollection = async () => {
        setLoading(true);
        const collectionRef = collection(db, 'films_saved', currentUser.uid, 'collection');

        const data = {
            name: collectionInput.trim(),
            createAt: serverTimestamp(),
            data: [],
        };

        try {
            const result = await addDoc(collectionRef, data);
            setLoading(false);

            return result.id;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getCollections = async () => {
        setLoading(true);

        try {
            const ref = collection(db, 'films_saved', currentUser.uid, 'collection');
            const q = query(ref, orderBy('createAt', 'desc'));

            onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                setCollections(data);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllFilm = () => {
        setLoading(true);

        try {
            const ref = collection(db, 'films_saved', currentUser.uid, 'all_films');
            const q = query(ref, orderBy('createAt', 'desc'));

            onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                setAllFilms(data);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const addToCollection = async (collectionId, film) => {
        const collectionRef = doc(db, 'films_saved', currentUser.uid, 'collection', collectionId);
        const collectionName = collections.find(
            (collection) => (collection.id = collectionId),
        ).name;
        try {
            await updateDoc(collectionRef, {
                data: arrayUnion(film),
            });

            toast.success(`Saved to ${collectionName} collection`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } catch (error) {
            console.log('error: ', error);
            toast.error(`Cannot save to ${collectionName}`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    const addToAllFilm = async (film) => {
        const collectionRef = collection(db, 'films_saved', currentUser.uid, 'all_films');

        const data = {
            createAt: serverTimestamp(),
            ...film,
        };

        try {
            const result = await addDoc(collectionRef, data);
            console.log('result: ', result);
            toast.success(`This film is saved`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            setLoading(false);
        } catch (error) {
            toast.error('Cannot save !', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            setLoading(false);
        }
    };

    const removeFromCollection = async (collectionId, filmId) => {
        getCollections();

        const collectionRef = doc(db, 'films_saved', currentUser.uid, 'collection', collectionId);
        const collection = collections.find((collection) => collection.id === collectionId);

        try {
            await updateDoc(collectionRef, {
                data: collection.data.filter((film) => film.id !== filmId),
            });
        } catch (error) {}
    };

    const removeFromAllFilm = async (filmId) => {
        setLoading(true);

        try {
            const allFilmRef = collection(db, 'films_saved', currentUser.uid, 'all_films');

            onSnapshot(allFilmRef, async (snapshot) => {
                const films = snapshot.docs.map((doc) => ({ film_id: doc.id, ...doc.data() }));
                const filmIsRemovedId = films.find((film) => film.id === filmId).film_id;

                await deleteDoc(
                    doc(db, 'films_saved', currentUser.uid, 'all_films', filmIsRemovedId),
                );

                setLoading(false);
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const saveData = {
        saved,
        collections,
        collectionInput,
        loading,
        allFilms,
        setSaved,
        setCollections,
        setCollectionInput,
        createCollection,
        getCollections,
        addToAllFilm,
        addToCollection,
        removeFromCollection,
        removeFromAllFilm,
        getAllFilm,
    };

    return <SaveContext.Provider value={saveData}>{children}</SaveContext.Provider>;
}

export { SaveProvider, SaveContext };
