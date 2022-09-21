import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';

import { Link } from 'react-router-dom';

import Image from 'src/Image';

import formartDate from 'src/utils';

const cx = classNames.bind(styles);

function SearchItem({ data }) {
    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;
    const newDate = formartDate(data?.release_date || data?.first_air_date);

    return (
        <Link to="/watch">
            <div className={cx('search-item')}>
                <Image src={`${baseImgURL}${data?.poster_path}`} alt="" />
                <div className={cx('info')}>
                    <p className={cx('title')}>{data?.title || data?.name}</p>
                    <span className={cx('release-date')}>{newDate}</span>
                </div>
            </div>
        </Link>
    );
}

export default SearchItem;
