import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SaveDetail.module.scss';

import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';

import GalleryHeader from 'src/components/Gallery/GalleryHeader';
import GalleryItem from 'src/components/Gallery/GalleryItem';
import config from 'src/config';

import { Menu } from '../Popper';
import { useContext, useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { ModalContext } from 'src/context/ModalContext';
import { SaveContext } from 'src/context/SaveContext';
import { LoadingBar } from '../LoadingBar';
import { MdOutlineCheck } from 'react-icons/md';
import { RiBookmarkLine } from 'react-icons/ri';
import { UserContext } from 'src/context/UserContext';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from 'src/firebase/firebase';

const cx = classNames.bind(styles);

function SaveDetail({
    collectionId,
    collectionName,
    pageName = collectionName,
    films = [],
    menuItems = [],
    setFilms = () => {},
    ...props
}) {
    const [showMenu, setShowMenu] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [checked, setChecked] = useState([]);
    const [collectionSaved, setCollectionSaved] = useState([]);
    const [showCheck, setShowCheck] = useState(false);
    const [checkAll, setCheckAll] = useState(false);

    const [updateColInput, setUpdateColInput] = useState(collectionName);
    const [showAction, setShowAction] = useState(false);

    const {
        updateCollectionName,
        removeAllInCollection,
        removeItemInCollection,
        deleteCollection,
        removeFromCollection,
        removeFromAllFilm,
        loading,
    } = useContext(SaveContext);
    const { showModal, handleShowModal, modalName, handleHideModal } = useContext(ModalContext);
    const currentUser = useContext(UserContext);

    const navigate = useNavigate();

    const hideMenu = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (showMenu) {
                if (window.scrollY >= 60) {
                    setShowMenu(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean event
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showMenu]);

    const handleHideUpdateModal = () => {
        setIsUpdated(false);

        // Cancel
        if (!isUpdated && updateColInput !== collectionName) {
            setUpdateColInput(collectionName);
        }

        handleHideModal();
    };

    const handleUpdateCollection = () => {
        const result = updateCollectionName(collectionId, updateColInput.trim());
        if (result) {
            setIsUpdated(true);
            navigate(`/saved/${updateColInput}/${collectionId}`, { replace: true });
            handleHideUpdateModal();
        }
    };

    const handleCheck = (id) => {
        if (checkAll) {
            setCheckAll(false);
        }

        setChecked((prev) => {
            const isChecked = checked.includes(id);

            if (isChecked) {
                // Uncheck
                return checked.filter((item) => item !== id);
            } else {
                // check
                return [...prev, id];
            }
        });
    };

    const handleToggleCheckAll = () => {
        if (checkAll) {
            setChecked([]);
            setCheckAll(false);
            return;
        }

        setCheckAll(true);

        films.forEach((film) => {
            handleCheck(film.id);
        });
    };

    const handleCancelAction = () => {
        setShowAction(false);
        setShowCheck(false);
        setChecked([]);
    };

    const checkSavedInCollection = async () => {
        let collectionSaved = [];
        const ref = collection(db, 'films_saved', currentUser.uid, 'collection');

        const querySnapshot = await getDocs(ref);
        const collectionList = querySnapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));

        collectionList.forEach((collection) => {
            let saved = {};

            const existsFilm = collection.data.filter((film) => checked.includes(film.id));

            if (existsFilm.length > 0) {
                saved['films'] = existsFilm;
                saved['collectionId'] = collection._id;
                collectionSaved.push(saved);
            }
        });

        setCollectionSaved(collectionSaved);
        return collectionSaved;
    };

    const removeFilmSavedInCollection = () => {
        // Remove film in collection
        collectionSaved.forEach((data) => {
            data.films.forEach((film) => {
                removeFromCollection(data.collectionId, film.id);
            });
        });
        setCollectionSaved([]);
        handleHideModal(false);

        // Continue remove films
        handleRemoveFilm();
    };

    const handleRemoveFilm = async () => {
        switch (pageName) {
            case 'all-films':
                const saved = await checkSavedInCollection();
                if (saved.length > 0) {
                    handleShowModal('confirm-remove-film');
                    return;
                }

                if (checkAll) {
                    checked.forEach((id) => {
                        removeFromAllFilm(id);
                    });
                    setFilms([]);
                    setCheckAll(false);
                } else {
                    checked.forEach((id) => {
                        removeFromAllFilm(id);
                    });
                    const newData = films.filter((item) => !checked.includes(item.id));
                    setFilms(newData);
                }
                break;

            default:
                if (checkAll) {
                    removeAllInCollection(collectionId);
                    setFilms([]);
                    setCheckAll(false);
                } else {
                    const newData = films.filter((item) => !checked.includes(item.id));
                    removeItemInCollection(collectionId, newData);
                    setFilms(newData);
                }
                break;
        }

        setShowCheck(false);
        setShowAction(false);
    };

    const handleDeleteCollection = () => {
        deleteCollection(collectionId);
        navigate('/saved', { replace: true });
        handleHideModal(false);
    };

    const menuPayload = {
        setShowAction,
        setShowCheck,
    };

    useEffect(() => {
        setUpdateColInput(collectionName);
    }, [collectionName]);

    return (
        <div className={cx('wrapper')}>
            {loading && <LoadingBar height={4} />}

            <Modal
                onHideModal={handleHideUpdateModal}
                title="Edit collection"
                show={modalName === 'update-collection' && showModal}
            >
                <input
                    onChange={(e) => setUpdateColInput(e.target.value)}
                    className="collection-modal-input"
                    type="text"
                    value={updateColInput}
                    placeholder="Collection name"
                />
                <footer className="mt-2 d-flex align-items-center justify-content-end">
                    <Button onClick={handleHideUpdateModal} type="no-outline">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateCollection} type="primary">
                        Update
                    </Button>
                </footer>
            </Modal>

            <Modal title="Remove film" show={modalName === 'confirm-remove-film' && showModal}>
                <p className=" mb-4 mt-4">
                    Removing this film will also remove the film from the collection.
                </p>
                <footer className="d-flex align-items-center justify-content-end">
                    <Button onClick={handleHideModal} type="no-outline">
                        Cancel
                    </Button>
                    <Button onClick={removeFilmSavedInCollection} type="danger">
                        Remove
                    </Button>
                </footer>
            </Modal>
            <Modal title="Delete collection" show={modalName === 'confirm-delete' && showModal}>
                <p className=" mb-4 mt-4">
                    The system will still save films when you delete this collection
                </p>
                <footer className="d-flex align-items-center justify-content-end">
                    <Button onClick={handleHideModal} type="no-outline">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteCollection} type="danger">
                        Delete
                    </Button>
                </footer>
            </Modal>

            {showAction && (
                <div className={cx('actions')}>
                    <button
                        className={cx('select-all-btn', {
                            active: checkAll,
                        })}
                        onClick={handleToggleCheckAll}
                    >
                        Select all
                    </button>
                    <button
                        onClick={handleRemoveFilm}
                        disabled={checked.length <= 0}
                        className="text-danger"
                    >
                        Remove
                    </button>
                    <button onClick={handleCancelAction}>Cancel</button>
                </div>
            )}

            <div className="mb-4 d-flex align-items-center justify-content-between">
                <Link className=" d-flex align-items-center" to={config.routes.saved}>
                    <IoIosArrowBack />
                    Saved
                </Link>
                <Menu
                    hideClickInner={hideMenu}
                    onClickOutside={hideMenu}
                    visible={showMenu}
                    placement="bottom-end"
                    menuItems={menuItems}
                    menuPayload={menuPayload}
                >
                    <button className={cx('menu-btn')} onClick={() => setShowMenu(!showMenu)}>
                        <BsThreeDots />
                    </button>
                </Menu>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <GalleryHeader
                    heading={collectionName || 'All Films'}
                    headerStyles={{ marginBottom: 0 }}
                />
            </div>
            <div className="mt-5">
                <div className="row">
                    {films.map((film) => (
                        <div
                            key={film.id}
                            className="col-md-1-5 col-md-4 col-sm-6 col-6 pb-4 d-block"
                        >
                            <div className={cx('film-item')}>
                                <GalleryItem mediaType={film.mediaType} data={film} />
                                {showCheck && (
                                    <button
                                        onClick={() => handleCheck(film.id)}
                                        className={cx('checkbox-btn', {
                                            check: checked.includes(film.id),
                                        })}
                                    >
                                        <MdOutlineCheck />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {films.length <= 0 && (
                    <div className={cx('empty')}>
                        <div className={cx('empty-bookmark')}>
                            <span>
                                <RiBookmarkLine />
                            </span>
                        </div>
                        <p>No saved here</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SaveDetail;
