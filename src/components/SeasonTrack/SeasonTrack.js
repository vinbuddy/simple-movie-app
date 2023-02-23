import classNames from 'classnames/bind';
import styles from './SeasonTrack.module.scss';

import { FaAngleDown } from 'react-icons/fa';
import { Image } from 'react-bootstrap';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SeasonTrack({ id, seasonDetail, currentSeason }) {
    console.log('currentSeason: ', currentSeason);
    console.log('seasonDetail: ', seasonDetail);

    const [active, setActive] = useState(currentSeason);
    const [open, setOpen] = useState(true);
    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;

    // Open -> show episode
    const handleOpenSeason = (seasonNum) => {
        setActive(seasonNum);
        if (active === seasonNum) {
            setOpen(!open);
        } else {
            setOpen(true);
        }
    };

    return (
        <ul className={cx('track')}>
            {!!seasonDetail &&
                seasonDetail.map((season, index) => (
                    <li key={index} className={cx('track-item')}>
                        <div
                            className={cx('track-field', {
                                open: open && active === season?.season_number,
                            })}
                            onClick={() => handleOpenSeason(season?.season_number)}
                        >
                            <div className={cx('track-heading')}>
                                <div className={cx('track-img')}>
                                    <Image
                                        src={`${baseImgURL}${season?.poster_path}`}
                                        alt="season image"
                                    />
                                </div>
                                <h3 className={cx('track-title')}>{season?.name}</h3>
                            </div>
                            <span
                                className={cx('track-icon', {
                                    open: open && active === season?.season_number,
                                })}
                            >
                                <FaAngleDown />
                            </span>
                        </div>

                        {/* Episodes list */}
                        {active === season?.season_number && open && (
                            <ul className={cx('track-episode')}>
                                <li className={cx('track-episode-item')}>
                                    <div className={cx('track-episode-img')}>
                                        <Image
                                            src="https://image.tmdb.org/t/p/w185/oWaKdUeMOlVZem3v9DWsdDGlTuY.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('track-episode-info')}>
                                        <h3 className={cx('track-title')}>Pilot</h3>
                                        <span className={cx('track-episode-date')}>22-12-2023</span>
                                    </div>
                                </li>
                                <li className={cx('track-episode-item')}>
                                    <div className={cx('track-episode-img')}>
                                        <Image
                                            src="https://image.tmdb.org/t/p/w185/r3CzGadu9EEunFtuTqmXxMRkX5V.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('track-episode-info')}>
                                        <h3 className={cx('track-title')}>Pilot</h3>
                                        <span className={cx('track-episode-date')}>22-12-2023</span>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </li>
                ))}
        </ul>
    );
}

export default SeasonTrack;
