import { useEffect, useContext, useState } from 'react';
import './Watch.scss';
import Skeleton from 'react-loading-skeleton';

import GalleryHeader from '../Gallery/GalleryHeader';
import GalleryItem from '../Gallery/GalleryItem';
import GenreInfor from '../FilmInfo/GenreInfor';
import OverviewInfo from '../FilmInfo/OverviewInfor';
import Modal from '../Modal';

import { IoShareOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { TiStarFullOutline } from 'react-icons/ti';
import { TbTimeline } from 'react-icons/tb';
import { MdOutlineContentCopy } from 'react-icons/md';
import { BsLink45Deg } from 'react-icons/bs';

import { toast, ToastContainer } from 'react-toastify';
import { ModalContext } from 'src/context/ModalContext';
import Button from '../Button';

function Watch({ mediaType = 'movie', id, recommend, detail = {} }) {
    const { showModal, handleShowModal, handleHideModal, modalName } = useContext(ModalContext);
    console.log('modalName: ', modalName);

    useEffect(() => {
        if (Boolean(detail?.title)) document.title = `${detail?.title} | Watch`;
    }, [detail]);

    const handleCopyURL = async () => {
        try {
            const copyValue = window.location.href;
            await navigator.clipboard.writeText(copyValue);
            toast.success('Copied to clipbroad', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } catch (err) {
            toast.error('Error', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    const showShareModal = () => {
        handleShowModal('share');
    };

    return (
        <div style={{ padding: '24px 18px 0 0' }}>
            <ToastContainer hideProgressBar pauseOnHover={false} />

            {modalName === 'share' && showModal && (
                <Modal title="Share" modalName="share">
                    <div className="share-url-bar">
                        <span className="share-url-icon">
                            <BsLink45Deg />
                        </span>
                        <input
                            value={window.location.href}
                            className="share-url-input"
                            type="text"
                            readOnly
                        />
                    </div>
                    <footer className="share-url-footer">
                        <Button onClick={handleHideModal} type="no-outline">
                            Cancel
                        </Button>
                        <Button onClick={handleCopyURL} type="primary">
                            Copy link
                        </Button>
                    </footer>
                </Modal>
            )}

            <div className="row pb-4">
                {/* Watch Section */}
                <div className="col-lg-9 pb-4">
                    <div className="watch">
                        <div className="watch-frame">
                            {Object.keys(detail).length === 0 ? (
                                <Skeleton width="100%" height="100%" />
                            ) : (
                                <iframe
                                    allowFullScreen={true}
                                    title="watch embed"
                                    className="watch-embed"
                                    src={`https://2embed.org/embed/${mediaType}?tmdb=${id}`}
                                ></iframe>
                            )}
                        </div>

                        {/* Title - Actions */}
                        <div className="watch-info">
                            <h2 className="watch-title">
                                {detail?.original_title || detail?.original_name || (
                                    <Skeleton width="40%" />
                                )}
                            </h2>
                            <div className="watch-actions">
                                <button className="watch-actions-btn">
                                    <AiOutlineHeart />
                                </button>
                                <button
                                    onClick={showShareModal}
                                    style={{ lineHeight: 0 }}
                                    className="watch-actions-btn"
                                >
                                    <IoShareOutline />
                                </button>
                            </div>
                        </div>

                        <div className="watch-detail-wrapper">
                            <ul className="watch-detail">
                                <li className="watch-detail-item">
                                    <TiStarFullOutline />
                                    &#160;
                                    <span>{detail?.vote_average}</span>
                                </li>
                                <li className="watch-detail-item">
                                    <TbTimeline />
                                    &#160;
                                    <span>
                                        {detail?.runtime || detail?.last_episode_to_air?.runtime}
                                    </span>
                                    &#160;min
                                </li>
                            </ul>
                            <ul className="watch-genres">
                                {!!detail?.genres && detail?.genres.length > 0 ? (
                                    detail?.genres.map((genre) => (
                                        <GenreInfor key={genre.id} name={genre.name} />
                                    ))
                                ) : (
                                    <Skeleton width={200} height={40} />
                                )}
                            </ul>

                            {detail?.overview ? (
                                <OverviewInfo>{detail?.overview}</OverviewInfo>
                            ) : (
                                <Skeleton height={70} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Recommend film */}
                <div className="col-lg-3">
                    <div className="suggest-bar">
                        <ul className="suggest-list">
                            <GalleryHeader
                                heading={recommend.length > 0 ? 'Recommend' : 'Not recommend film'}
                            />
                            {recommend.map((item, index) => (
                                <li key={index} className="suggest-item">
                                    <GalleryItem
                                        imgHeight={130}
                                        imgWidth={110}
                                        mediaType="movie"
                                        galleryItemType="horizontal"
                                        data={item}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watch;
