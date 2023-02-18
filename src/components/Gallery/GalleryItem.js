import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

import { getMonthYear } from 'src/utils/handleDate';

import { TiStarFullOutline } from 'react-icons/ti';
import { BsPeople } from 'react-icons/bs';

import Image from '../Image';

const cx = classNames.bind(styles);

function GalleryItem({
    data,
    mediaType = 'movie',
    galleryItemType = 'vertical',
    imgHeight,
    imgWidth,
}) {
    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;
    const date = getMonthYear(data?.release_date || data?.first_air_date);

    return (
        <Link to={`/infor/${mediaType}/${data?.id}`}>
            <>
                {galleryItemType === 'vertical' && (
                    <div title={data?.title || data?.name} className={cx('gallery-item-vertical')}>
                        <div className={cx('gallery-thumb')}>
                            <div className={cx('gallery-fallback-img')}></div>
                            <Image src={`${baseImgURL}${data?.poster_path}`} alt="gallery" />

                            <div className={cx('gallery-vote-wrapper')}>
                                <TiStarFullOutline className={cx('gallery-vote-icon')} />
                                <span className={cx('gallery-vote')}>{data?.vote_average}</span>
                            </div>
                        </div>

                        <div className={cx('gallery-info')}>
                            <p className={cx('gallery-name-vertical')}>
                                {data?.title || data?.name}
                            </p>

                            <div
                                className={cx(
                                    'd-flex align-items-center',
                                    'justify-content-between',
                                )}
                            >
                                <p className={cx('gallery-year')}>{date}</p>
                                <div title="vote count" className={cx('d-flex')}>
                                    <BsPeople className={cx('gallery-like-icon')} />
                                    <span className={cx('gallery-vote-count')}>
                                        {data?.vote_count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Horizontal */}
                {galleryItemType === 'horizontal' && (
                    <div
                        title={data?.title || data?.name}
                        className={cx('gallery-item-horizontal')}
                    >
                        <div
                            className={cx('gallery-thumb')}
                            style={{
                                height: imgHeight,
                                width: imgWidth,
                                minWidth: imgWidth,
                                borderRadius: 12,
                            }}
                        >
                            <Image src={`${baseImgURL}${data?.poster_path}`} alt="gallery" />
                        </div>

                        <div className={cx('gallery-info-horizontal')}>
                            <p className={cx('gallery-name-horizontal')}>
                                {data?.title || data?.name}
                            </p>

                            <p className={cx('gallery-year')}>{date}</p>

                            <div title="vote count">
                                <BsPeople className={cx('gallery-like-icon')} />
                                <span className={cx('gallery-vote-count')}>{data?.vote_count}</span>
                            </div>

                            <div className={cx('gallery-vote-horizontal')}>
                                <TiStarFullOutline className={cx('gallery-vote-icon')} />
                                <span>{data?.vote_average}</span>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </Link>
    );
}

export default GalleryItem;
