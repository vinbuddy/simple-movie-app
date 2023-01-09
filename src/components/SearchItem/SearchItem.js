import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { formartDate } from 'src/utils/handleDate';
import Image from '../Image';

const cx = classNames.bind(styles);

function SearchItem({ data, mediaType, onClick }) {
    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;
    const newDate = formartDate(data?.release_date || data?.first_air_date);

    return (
        <Link to={`/infor/${mediaType}/${data?.id}`} onClick={onClick}>
            <div className={cx('search-item')}>
                <div className={cx('search-img')}>
                    <Image effect="blur" src={baseImgURL + data?.poster_path} alt="" />
                </div>
                <div className={cx('info')}>
                    <p className={cx('title')}>{data?.title || data?.name}</p>
                    <span className={cx('release-date')}>{newDate}</span>
                </div>
            </div>
        </Link>
    );
}

export default SearchItem;
