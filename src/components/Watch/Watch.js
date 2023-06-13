import { useContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Watch.module.scss';

import Skeleton from 'react-loading-skeleton';

import GalleryHeader from '../Gallery/GalleryHeader';
import GalleryItem from '../Gallery/GalleryItem';
import GenreInfor from '../FilmInfo/GenreInfor';
import OverviewInfo from '../FilmInfo/OverviewInfor';
import SeasonTrack from '../SeasonTrack';

import { TiStarFullOutline } from 'react-icons/ti';
import { TbTimeline, TbCalendar } from 'react-icons/tb';

import { getEpisode } from 'src/services/seasonService';
import { formartDate } from 'src/utils/handleDate';
import { UserContext } from 'src/context/UserContext';
import { SaveContext } from 'src/context/SaveContext';
import { ModalContext } from 'src/context/ModalContext';

import LoadingBar from '../LoadingBar';
import { SaveShareFilm } from '../SaveShareFilm';

const cx = classNames.bind(styles);

function Watch({ mediaType = 'movie', id, recommend, detail = {} }) {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [currentSeason, setCurrentSeason] = useState(() => {
        const current = searchParams.get('seasons');
        return Number(current);
    });
    const [currentEpisode, setCurrentEpisode] = useState(() => {
        const current = searchParams.get('episodes');
        return Number(current);
    });

    const [episode, setEpisode] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (Boolean(detail?.title || detail?.name))
            document.title = `${detail?.title || detail?.name} | Watch`;
    }, [detail]);

    useEffect(() => {
        const fetchEpisode = async () => {
            setLoading(true);
            const result = await getEpisode(id, currentSeason, currentEpisode);
            setEpisode(result);

            setLoading(false);
        };

        fetchEpisode();
    }, [currentEpisode, currentSeason]);

    return (
        <div className={cx('watch')}>
            {loading && <LoadingBar top={0} />}

            <div className="row pb-4">
                {/* Watch Section */}
                <div className="col-lg-9 pb-4">
                    <div className={cx('watch-section')}>
                        <div className={cx('watch-frame')}>
                            {Object.keys(detail).length === 0 ? (
                                <Skeleton width="100%" height="100%" />
                            ) : (
                                <iframe
                                    allowFullScreen={true}
                                    title="watch embed"
                                    className={cx('watch-embed')}
                                    src={
                                        mediaType === 'movie'
                                            ? `https://www.2embed.to/embed/tmdb/${mediaType}?id=${id}`
                                            : `https://www.2embed.to/embed/tmdb/${mediaType}?id=${id}&s=${currentSeason}&e=${currentEpisode}`
                                    }
                                ></iframe>
                            )}
                        </div>

                        {/* Title - Actions */}
                        <div className={cx('watch-info')}>
                            <h2 className={cx('watch-title')}>
                                {detail?.title || detail?.name || <Skeleton width="40%" />}
                            </h2>

                            <SaveShareFilm mediaType={mediaType} detail={detail} />
                        </div>

                        {/* Episode name title */}
                        {mediaType === 'tv' && (
                            <h3 className={cx('watch-title-episode')}>
                                Season {episode?.season_number} - Episode {episode?.episode_number}:{' '}
                                {episode?.name}
                            </h3>
                        )}

                        <div className={cx('watch-detail-wrapper')}>
                            <ul className={cx('watch-detail')}>
                                <li className={cx('watch-detail-item')}>
                                    <TiStarFullOutline />
                                    &#160;
                                    <span>{detail?.vote_average}</span>
                                </li>
                                <li className={cx('watch-detail-item')}>
                                    <TbTimeline />
                                    &#160;
                                    <span>{detail?.runtime || episode?.runtime} min</span>
                                </li>
                                <li className={cx('watch-detail-item')}>
                                    <TbCalendar />
                                    &#160;
                                    <span>
                                        {formartDate(detail?.release_date || episode?.air_date)}
                                    </span>
                                </li>
                            </ul>
                            <ul className={cx('watch-genres')}>
                                {!!detail?.genres && detail?.genres.length > 0 ? (
                                    detail?.genres.map((genre) => (
                                        <GenreInfor key={genre.id} name={genre.name} />
                                    ))
                                ) : (
                                    <Skeleton width={200} height={40} />
                                )}
                            </ul>

                            {detail?.overview ? (
                                <OverviewInfo>{detail?.overview || episode?.overview}</OverviewInfo>
                            ) : (
                                <Skeleton height={70} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Recommend/Episode film */}
                <div className="col-lg-3">
                    <div
                        style={
                            mediaType === 'tv'
                                ? {
                                      overflowY: 'scroll',
                                      maxHeight: 550,
                                  }
                                : {}
                        }
                        className={cx('suggest-bar')}
                    >
                        {mediaType === 'movie' && (
                            <ul className={cx('suggest-list')}>
                                <GalleryHeader
                                    heading={
                                        recommend.length > 0 ? 'Recommend' : 'Not recommend film'
                                    }
                                />
                                {recommend.map((item, index) => (
                                    <li key={index} className={cx('suggest-item')}>
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
                        )}

                        {/* Track Seasons - Episodes */}
                        {mediaType === 'tv' && (
                            <>
                                <GalleryHeader heading="Seasons - Episodes" />
                                <SeasonTrack
                                    id={id}
                                    seasonDetail={detail?.seasons}
                                    currentSeason={currentSeason}
                                    currentEpisode={currentEpisode}
                                    setCurrentSeason={setCurrentSeason}
                                    setCurrentEpisode={setCurrentEpisode}
                                    setSearchParams={setSearchParams}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watch;
