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
} from 'firebase/firestore';
import { UserContext } from 'src/context/UserContext';

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
            console.log('Document written with ID: ', result);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getCollections = async () => {
        setLoading(true);

        try {
            const ref = collection(db, 'films_saved', currentUser.uid, 'collection');
            const q = query(ref, orderBy('createAt'));

            onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                setCollections(data);
            });

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const addToCollection = async (collectionId, film) => {
        const collectionRef = doc(db, 'films_saved', currentUser.uid, 'collection', collectionId);

        try {
            await updateDoc(collectionRef, {
                data: arrayUnion(film),
            });
        } catch (error) {}
    };

    // Add + Create all films collection
    const addToAllFilm = async (film) => {
        const collectionRef = collection(db, 'films_saved', currentUser.uid, 'all_films');

        const data = {
            createAt: serverTimestamp(),
            ...film,
        };

        try {
            const result = await addDoc(collectionRef, data);
            console.log('result: ', result);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllFilm = async () => {
        try {
            const ref = collection(db, 'films_saved', currentUser.uid, 'all_films');
            const q = query(ref, orderBy('createAt'));

            onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));
                setAllFilms(data);
            });

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const saveData = {
        saved,
        collections,
        allFilms,
        collectionInput,
        loading,
        setSaved,
        setCollections,
        setCollectionInput,
        createCollection,
        getCollections,
        addToAllFilm,
        getAllFilm,
    };

    return <SaveContext.Provider value={saveData}>{children}</SaveContext.Provider>;
}

export { SaveProvider, SaveContext };
