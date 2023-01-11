import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

import { getMonthYear } from 'src/utils/handleDate';

import { TiStarFullOutline } from 'react-icons/ti';
import { BsPeople } from 'react-icons/bs';

import Image from '../Image';

const cx = classNames.bind(styles);

function GalleryItem({ data, mediaType }) {
    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;
    const date = getMonthYear(data?.release_date || data?.first_air_date);

    return (
        <Link to={`/infor/${mediaType}/${data?.id}`}>
            <div title={data?.title || data?.name} className={cx('gallery-item')}>
                <div className={cx('gallery-thumb')}>
                    <div className={cx('gallery-fallback-img')}></div>
                    <Image src={`${baseImgURL}${data?.poster_path}`} alt="gallery" />

                    <div className={cx('gallery-vote-wrapper')}>
                        <TiStarFullOutline className={cx('gallery-vote-icon')} />
                        <span className={cx('gallery-vote')}>{data?.vote_average}</span>
                    </div>
                </div>

                <div className={cx('gallery-info')}>
                    <p className={cx('gallery-name')}>{data?.title || data?.name}</p>

                    <div className={cx('d-flex align-items-center', 'justify-content-between')}>
                        <p className={cx('gallery-year')}>{date}</p>
                        <div title="vote count" className={cx('d-flex')}>
                            <BsPeople className={cx('gallery-like-icon')} />
                            <span className={cx('gallery-vote-count')}>{data?.vote_count}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default GalleryItem;
