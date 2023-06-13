import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './SaveShareFilm.module.scss';
import Tippy from '@tippyjs/react/headless';
import { toast } from 'react-toastify';

import { UserContext } from 'src/context/UserContext';
import { SaveContext } from 'src/context/SaveContext';
import { ModalContext } from 'src/context/ModalContext';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'src/firebase/firebase';

import { BsBookmark, BsBookmarkFill, BsLink45Deg, BsShare } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';

import { PopperFrame } from '../Popper';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

function SaveShareFilm(
    { mediaType, show = true, detail = {}, className, shareBtn = true, ...props },
    ref,
) {
    const currentUser = useContext(UserContext);
    const {
        saved,
        collectionInput,
        collections,
        setSaved,
        setCollectionInput,
        addToCollection,
        createCollection,
        addToAllFilm,
        getCollections,
        removeFromCollection,
        removeFromAllFilm,
    } = useContext(SaveContext);
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
            const { exists } = checkFilmExistsInCollection();
            if (exists) {
                // Remove from collection
                handleShowModal('warning');
                setShowSavePopper(false);
            } else {
                // Remove from all films
                handleUnsave();
                setSaved(false);
                setShowSavePopper(false);
                toast.success(`This film is removed`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            }
        } else {
            addToAllFilm(detail, mediaType);
            setSaved(true);
            setShowSavePopper(false);
        }
    };

    const handleSaveToCollection = (collectionId) => {
        addToCollection(collectionId, detail, mediaType);

        if (!saved) {
            addToAllFilm(detail);
        }

        setSaved(true);
        setShowSavePopper(false);
    };

    const handleCreateAndSaveFilm = async () => {
        try {
            const collectionId = await createCollection();
            addToCollection(collectionId, detail, mediaType);

            toast.success('This film is saved', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } catch (error) {
            toast.error('Something went wrong', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        handleHideModal();
    };

    const checkFilmExistsInCollection = () => {
        let exists = false;
        let collectionsExists = [];

        collections.forEach((collection) => {
            const films = collection.data;

            films.forEach((film) => {
                if (film.id === detail.id) {
                    exists = true;
                    collectionsExists.push(collection);
                }
            });
        });

        return {
            exists,
            collectionsExists,
        };
    };

    const handleUnsaveFromCollections = () => {
        const { collectionsExists } = checkFilmExistsInCollection();

        collectionsExists.forEach((collection) => {
            removeFromCollection(collection.id, detail.id);
        });

        handleUnsave();
        handleHideModal();

        toast.success(`This film is removed`, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const handleUnsave = () => {
        removeFromAllFilm(detail.id);
    };

    return (
        <>
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

            <Modal show={modalName === 'new-collection' && showModal} title="Create collection">
                <div>
                    <input
                        onChange={(e) => setCollectionInput(e.target.value)}
                        className="collection-modal-input"
                        type="text"
                        value={collectionInput}
                        placeholder="Collection name"
                    />
                </div>
                <footer className="d-flex align-items-center justify-content-end">
                    <Button onClick={handleHideModal} type="no-outline">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateAndSaveFilm} type="primary">
                        Create and save
                    </Button>
                </footer>
            </Modal>

            <Modal show={modalName === 'warning' && showModal} title="Warning">
                <p className="text-center mb-4 mt-4">
                    This film will be removed from collections ?
                </p>
                <footer className="d-flex align-items-center justify-content-end">
                    <Button onClick={handleHideModal} type="no-outline">
                        Cancel
                    </Button>
                    <Button onClick={handleUnsaveFromCollections} type="primary">
                        Remove
                    </Button>
                </footer>
            </Modal>

            {show && (
                <Tippy
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
                                    <button
                                        onClick={() => {
                                            handleShowModal('new-collection');
                                            setShowSavePopper(false);
                                        }}
                                        className={cx('save-popper-icon')}
                                    >
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
                                                        handleSaveToCollection(collection?.id)
                                                    }
                                                    key={collection?.id}
                                                    className={cx(
                                                        'save-popper-item',
                                                        'ps-4',
                                                        'pe-4',
                                                    )}
                                                >
                                                    <div className={cx('save-popper-img')}>
                                                        {collectionImg && (
                                                            <img
                                                                src={`${baseImgURL}${collectionImg}`}
                                                                alt=""
                                                            />
                                                        )}
                                                    </div>
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
                                    <Button
                                        onClick={toggleSaveToAllFilm}
                                        size="small"
                                        type="primary"
                                    >
                                        {saved ? 'Unsave' : 'Save'}
                                    </Button>
                                </footer>
                            </PopperFrame>
                        </div>
                    )}
                >
                    <div ref={ref} {...props} className={cx('save-actions', className)}>
                        <button
                            style={{ top: -1 }}
                            onClick={handleShowSavePopper}
                            className={cx('save-actions-btn')}
                        >
                            {saved ? (
                                <BsBookmarkFill className={cx('save-active')} />
                            ) : (
                                <BsBookmark />
                            )}
                        </button>
                        {shareBtn && (
                            <button
                                onClick={() => handleShowModal('share')}
                                className={cx('save-actions-btn')}
                            >
                                <BsShare />
                            </button>
                        )}
                    </div>
                </Tippy>
            )}
        </>
    );
}

export default forwardRef(SaveShareFilm);
