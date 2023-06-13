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

const cx = classNames.bind(styles);

function SaveDetail({ collectionId, collectionName, films, menuItems = [] }) {
    const [showMenu, setShowMenu] = useState(false);
    const [updateColInput, setUpdateColInput] = useState(collectionName);
    const [isUpdated, setIsUpdated] = useState(false);

    const { updateCollectionName, loading } = useContext(SaveContext);
    const { showModal, modalName, handleHideModal } = useContext(ModalContext);

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

    useEffect(() => {
        setUpdateColInput(collectionName);
    }, [collectionName]);

    return (
        <div className={cx('wrapper')}>
            {loading && <LoadingBar height={4} />}

            <Modal
                onHideModal={handleHideUpdateModal}
                title="Update collection"
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
                >
                    <button className={cx('menu-btn')} onClick={() => setShowMenu(!showMenu)}>
                        <BsThreeDots />
                    </button>
                </Menu>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <GalleryHeader heading={collectionName} headerStyles={{ marginBottom: 0 }} />
            </div>
            <div className="mt-4">
                <div className="row">
                    {films.map((film) => (
                        <div
                            key={film.id}
                            className="col-md-1-5 col-md-4 col-sm-6 col-6 pb-4 d-block"
                        >
                            <GalleryItem mediaType={film.mediaType} data={film} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SaveDetail;
