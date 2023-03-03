import { createRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SeasonTrack.module.scss';

import Image from '../Image';

import { getEpisodeList } from 'src/services/seasonService';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function SeasonTrack({
    id,
    seasonDetail,
    currentSeason,
    currentEpisode,
    setCurrentSeason,
    setCurrentEpisode,
}) {
    const [activeSeason, setActiveSeason] = useState(currentSeason);
    const [open, setOpen] = useState(true);
    // Episode list of current season
    const [episodeList, setEpisodeList] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const episodePath = Number(searchParams.get('episodes'));
    const seasonPath = Number(searchParams.get('seasons'));

    const episodeRef = useRef([]);

    const scrollEpisodeToView = (index) =>
        episodeRef.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        });

    useEffect(() => {
        const fetchEpisodeList = async () => {
            const result = await getEpisodeList(id, activeSeason);
            setEpisodeList(result);
        };

        fetchEpisodeList();
    }, [activeSeason]);

    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;

    // Open -> show episode
    const handleActiveSeason = (seasonNum, index) => {
        setActiveSeason(seasonNum);

        // Close
        if (activeSeason === seasonNum) {
            setOpen(!open);
        } else {
            setOpen(true);
        }
    };

    const handleActiveEpisode = (seasonNum, episodeNum, index) => {
        scrollEpisodeToView(index);
        setCurrentSeason(seasonNum);
        setCurrentEpisode(episodeNum);

        window.scrollTo(0, 0);
    };

    return (
        <ul className={cx('track')}>
            {!!seasonDetail &&
                seasonDetail.map((season, index) => (
                    <li
                        key={index}
                        className={cx('track-item', {
                            open: open && activeSeason === season?.season_number,
                            active: seasonPath === season?.season_number,
                        })}
                    >
                        <div
                            className={cx('track-field', {
                                open: open && activeSeason === season?.season_number,
                            })}
                            onClick={() => handleActiveSeason(season?.season_number, index)}
                        >
                            <div className={cx('track-img')}>
                                <Image
                                    src={`${baseImgURL}${season?.poster_path}`}
                                    alt="season image"
                                />
                            </div>
                            <div className={cx('track-info')}>
                                <h3 className={cx('track-title')}>{season?.name}</h3>
                                <span className={cx('track-episode-count')}>
                                    {season.episode_count} episodes
                                </span>
                            </div>
                        </div>

                        {/* Episodes list */}
                        {activeSeason === season?.season_number && open && (
                            <ul className={cx('track-episode')}>
                                {episodeList?.season_number === season?.season_number &&
                                    episodeList.episodes.map((episode, index) => (
                                        <li
                                            // ref={episodeRef}
                                            ref={(el) => (episodeRef.current[index] = el)}
                                            key={index}
                                            className={cx('track-episode-item', {
                                                active:
                                                    episodePath === episode?.episode_number &&
                                                    seasonPath === episode?.season_number,
                                            })}
                                        >
                                            <Link
                                                className={cx('track-episode-link')}
                                                to={{
                                                    pathname: `/watch/tv/${id}`,
                                                    search: `?seasons=${episode?.season_number}&episodes=${episode?.episode_number}`,
                                                }}
                                                onClick={() =>
                                                    handleActiveEpisode(
                                                        episode?.season_number,
                                                        episode?.episode_number,
                                                        index,
                                                    )
                                                }
                                            >
                                                <div className={cx('track-episode-img')}>
                                                    <Image
                                                        src={`${baseImgURL}${episode?.still_path}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className={cx('track-episode-info')}>
                                                    <h3 className={cx('track-episode-title')}>
                                                        <span>{episode?.episode_number}</span>
                                                        {'. '}
                                                        {episode?.name}
                                                    </h3>
                                                    <span className={cx('track-episode-detail')}>
                                                        {episode?.runtime} min
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </li>
                ))}
        </ul>
    );
}

export default SeasonTrack;
