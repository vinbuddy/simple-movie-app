import { useEffect } from 'react';
import './Watch.scss';
import Skeleton from 'react-loading-skeleton';

import GalleryHeader from '../Gallery/GalleryHeader';
import GalleryItem from '../Gallery/GalleryItem';
import GenreInfor from '../FilmInfo/GenreInfor';
import OverviewInfo from '../FilmInfo/OverviewInfor';

import { IoShareOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { TiStarFullOutline } from 'react-icons/ti';
import { TbTimeline } from 'react-icons/tb';

function Watch({ mediaType = 'movie', id, recommend, detail = {} }) {
    useEffect(() => {
        if (Boolean(detail?.title)) document.title = `${detail?.title} | Watch`;
    }, [detail]);

    return (
        <div style={{ padding: '24px 18px 0 0' }}>
            <div className="row pb-4">
                {/* Watch  */}
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
                                {detail?.original_title || detail?.original_name}
                            </h2>
                            <div className="watch-actions">
                                <button className="watch-actions-btn">
                                    <AiOutlineHeart />
                                </button>
                                <button style={{ lineHeight: 0 }} className="watch-actions-btn">
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

                            <OverviewInfo>{detail?.overview}</OverviewInfo>
                        </div>
                    </div>
                </div>

                {/* Suggest film */}
                <div className="col-lg-3">
                    <div className="suggest-bar">
                        <ul className="suggest-list">
                            <GalleryHeader heading="Recommend" />
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
