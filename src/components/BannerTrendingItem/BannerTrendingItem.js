import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BannerTrendingItem.module.scss';

import getYear from 'src/utils/getYear';
import Button from '../Button';

import { BsPlayCircle } from 'react-icons/bs';
const cx = classNames.bind(styles);

function BannerTrendingItem({ data }) {
    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;
    const year = getYear(data.release_date || data.first_air_date);

    return (
        <Link to="/watch" className={cx('banner-wrapper')}>
            <img className={cx('banner-img')} src={`${baseImgURL}${data.backdrop_path}`} alt="" />
            <div className={cx('banner-info')}>
                <h2 className={cx('banner-name')}>{data.title || data.name}</h2>
                <p className={cx('banner-overview')}>{data.overview}</p>
                <div className={cx('banner-desc')}>
                    <p className={cx('banner-year')}>{year}</p>

                    <Button leftIcon={<BsPlayCircle />} size="small" type="primary">
                        watch now
                    </Button>
                </div>
            </div>
        </Link>
    );
}

export default BannerTrendingItem;
