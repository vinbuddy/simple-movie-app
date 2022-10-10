import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

import { TiStarFullOutline } from 'react-icons/ti';
import { AiOutlineLike } from 'react-icons/ai';
import Image from 'src/components/Image';

const cx = classNames.bind(styles);

function GalleryItem({ data }) {
    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;
    return (
        <Link to="/watch" className="col-2 pb-4">
            <div title={data?.title || data?.name} className={cx('gallery-item')}>
                <div className={cx('gallery-thumb')}>
                    <Image src={`${baseImgURL}${data?.poster_path}`} alt="" />

                    <div className={cx('gallery-vote-wrapper')}>
                        <TiStarFullOutline className={cx('gallery-vote-icon')} />
                        <span className={cx('gallery-vote')}>{data?.vote_average}</span>
                    </div>
                </div>

                <div className={cx('gallery-info')}>
                    <p className={cx('gallery-name')}>{data?.title || data?.name}</p>

                    <div className="d-flex align-items-center justify-content-between">
                        <p className={cx('gallery-year')}>2020</p>
                        <div className="d-flex">
                            <AiOutlineLike className={cx('gallery-like-icon')} />
                            <span className={cx('gallery-vote-count')}>{data?.vote_count}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default memo(GalleryItem);
