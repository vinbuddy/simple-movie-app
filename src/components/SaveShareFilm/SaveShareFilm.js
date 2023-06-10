import { useContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './SaveShareFilm.module.scss';

import { UserContext } from 'src/context/UserContext';
import { SaveContext } from 'src/context/SaveContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'src/firebase/firebase';
import { BsBookmark, BsBookmarkFill, BsLink45Deg, BsShare } from 'react-icons/bs';
import { Button } from '../Button';
import { PopperFrame } from '../Popper';
import { ModalContext } from 'src/context/ModalContext';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react/headless';
import { HiOutlineShare } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { Modal } from '../Modal';
import { FiShare } from 'react-icons/fi';

const cx = classNames.bind(styles);

function SaveShareFilm({ detail = {}, className }) {
    const currentUser = useContext(UserContext);
    const { saved, collections, setSaved, addToCollection, addToAllFilm, getCollections } =
        useContext(SaveContext);
    const { showModal, handleShowModal, handleHideModal, modalName } = useContext(ModalContext);
    const [showSavePopper, setShowSavePopper] = useState(false);

    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;

    useEffect(() => {
        if (Boolean(detail?.title || detail?.name))
            document.title = `${detail?.title || detail?.name} | Watch`;
    }, [detail]);

    useEffect(() => {
        // check is saved
        const checkSaved = () => {
            const ref = collection(db, 'films_saved', currentUser.uid, 'all_films');

            onSnapshot(ref, (snapshot) => {
                const films = snapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));

                const isSaved = films.some((film) => film.id === detail.id);
                setSaved(isSaved);
            });
        };
        console.log(saved);
        if (currentUser) checkSaved();
    }, [currentUser, detail?.id]);

    const handleCopyURL = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Copied to clipbroad', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } catch (err) {
            toast.error('Error', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        handleHideModal();
    };

    const handleShowSavePopper = () => {
        getCollections();
        setShowSavePopper(!showSavePopper);
    };

    const toggleSaveToAllFilm = () => {
        if (saved) {
            // Remove from database
            // setSaved(false);
        } else {
            addToAllFilm(detail);
            setSaved(true);
            setShowSavePopper(false);

            toast.success(`Saved this film`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    const handleAddFilmToCollection = (collectionId, collectionName) => {
        addToCollection(collectionId, detail);

        if (!saved) {
            addToAllFilm(detail);
        }

        setSaved(true);
        setShowSavePopper(false);

        toast.success(`Saved to ${collectionName} collection`, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    return (
        <div>
            <Modal show={modalName === 'share' && showModal} title="Share">
                <div className={cx('share-url-bar')}>
                    <span className={cx('share-url-icon')}>
                        <BsLink45Deg />
                    </span>
                    <input
                        value={window.location.href}
                        className={cx('share-url-input')}
                        type="text"
                        readOnly
                    />
                </div>
                <footer className={cx('share-url-footer')}>
                    <Button onClick={handleHideModal} type="no-outline">
                        Cancel
                    </Button>
                    <Button onClick={handleCopyURL} type="primary">
                        Copy link
                    </Button>
                </footer>
            </Modal>
            <Tippy
                appendTo="parent"
                visible={showSavePopper}
                onClickOutside={() => setShowSavePopper(false)}
                trigger="click"
                hideOnClick={false}
                placement="bottom-end"
                interactive
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs} className={cx('save-popper')}>
                        <PopperFrame background="var(--nav-background)">
                            <header className="ps-4 pe-4 pt-4 pb-2 d-flex align-items-center justify-content-between">
                                <h3 className="mb-0">Collections</h3>
                                <button className={cx('save-popper-icon')}>
                                    <AiOutlinePlus />
                                </button>
                            </header>
                            <div>
                                <ul className={cx('save-popper-list')}>
                                    {collections.map((collection) => {
                                        let collectionImg = collection?.data[0]?.poster_path;
                                        return (
                                            <li
                                                onClick={() =>
                                                    handleAddFilmToCollection(
                                                        collection?.id,
                                                        collection?.name,
                                                    )
                                                }
                                                key={collection?.id}
                                                className={cx('save-popper-item', 'ps-4', 'pe-4')}
                                            >
                                                <img src={`${baseImgURL}${collectionImg}`} alt="" />
                                                <p>{collection?.name}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <footer className="p-4 d-flex align-items-center justify-content-end">
                                <Button
                                    size="small"
                                    onClick={() => setShowSavePopper(false)}
                                    type="no-outline"
                                >
                                    Cancel
                                </Button>
                                <Button onClick={toggleSaveToAllFilm} size="small" type="primary">
                                    {saved ? 'Unsave' : 'Save'}
                                </Button>
                            </footer>
                        </PopperFrame>
                    </div>
                )}
            >
                <div className={cx('save-actions', className)}>
                    <button
                        style={{ top: -1 }}
                        onClick={handleShowSavePopper}
                        className={cx('save-actions-btn')}
                    >
                        {saved ? <BsBookmarkFill className={cx('save-active')} /> : <BsBookmark />}
                    </button>
                    <button
                        onClick={() => handleShowModal('share')}
                        className={cx('save-actions-btn')}
                    >
                        <BsShare />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default SaveShareFilm;
