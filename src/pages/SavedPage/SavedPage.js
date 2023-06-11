import './SavedPage.scss';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';

import { ModalContext } from 'src/context/ModalContext';

import GalleryHeader from 'src/components/Gallery/GalleryHeader';
import { Modal } from 'src/components/Modal';
import { Button } from 'src/components/Button';
import { LoadingBar } from 'src/components/LoadingBar';
import config from 'src/config';
import { SaveContext } from 'src/context/SaveContext';

function SavedPage() {
    const {
        loading,
        allFilms,
        collections,
        collectionInput,
        setCollectionInput,
        createCollection,
        getCollections,
        getAllFilm,
    } = useContext(SaveContext);

    const { showModal, handleShowModal, handleHideModal } = useContext(ModalContext);
    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;

    const handleCreateCollection = () => {
        createCollection();
        getCollections();

        handleHideModal();
        setCollectionInput('');
    };

    // Get all collection
    useEffect(() => {
        getCollections();
        getAllFilm();
    }, []);

    console.log(allFilms);

    return (
        <div className="collection-wrapper">
            {loading && <LoadingBar height={4} />}

            <Modal show={showModal} title="New collection">
                <input
                    onChange={(e) => setCollectionInput(e.target.value)}
                    className="collection-modal-input"
                    type="text"
                    value={collectionInput}
                    placeholder="Collection name"
                />
                <footer className="mt-2 d-flex align-items-center justify-content-end">
                    <Button onClick={handleHideModal} type="no-outline">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateCollection} type="primary">
                        Create
                    </Button>
                </footer>
            </Modal>

            <div className="save-header">
                <GalleryHeader heading="Films saved" headerStyles={{ marginBottom: 0 }} />

                <button
                    onClick={() => handleShowModal('collection')}
                    className="save-collection-btn"
                >
                    <AiOutlinePlus />
                    <span>Create collection</span>
                </button>
            </div>

            <div className="collections">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 col-6 mb-4">
                        <Link to={config.routes.allFilms}>
                            <div className="collection-item">
                                <div className="collection-preview all-films">
                                    {allFilms.slice(0, 4).map((film) => (
                                        <img
                                            key={film.id}
                                            className="collection-img"
                                            src={`${baseImgURL}${film.poster_path}`}
                                            alt=""
                                        />
                                    ))}

                                    <div className="collection-preview-overlay"></div>
                                </div>
                                <div className="collection-info">
                                    <h3 className="collection-name">All films</h3>
                                    <span className="collection-quantity">
                                        {allFilms.length} films
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {collections.map((collection, index) => {
                        let collectionImg = collection?.data[0]?.poster_path;

                        return (
                            <div
                                key={collection?.id}
                                className="col-lg-4 col-md-4 col-sm-6 col-6 mb-4"
                            >
                                <Link to={`/saved/${collection?.name}/${collection?.id}`}>
                                    <div className="collection-item">
                                        <div className="collection-preview">
                                            {collectionImg && (
                                                <img
                                                    className="collection-img"
                                                    src={`${baseImgURL}${collectionImg}`}
                                                    alt=""
                                                />
                                            )}
                                            <div className="collection-preview-overlay"></div>
                                        </div>
                                        <div className="collection-info">
                                            <h3 className="collection-name">{collection?.name}</h3>
                                            <span className="collection-quantity">
                                                {collection?.data.length} films
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SavedPage;
