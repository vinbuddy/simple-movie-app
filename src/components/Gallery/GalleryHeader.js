import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

const cx = classNames.bind(styles);

function GalleryHeader({ heading, rightIcon, link }) {
    return (
        <div className={cx('gallery-header')}>
            {link ? (
                <Link to="/category" className={cx('gallery-heading')}>
                    <h1>
                        {heading} <span>{rightIcon}</span>
                    </h1>
                </Link>
            ) : (
                <div className={cx('gallery-heading')}>
                    <h1>
                        {heading} <span>{rightIcon}</span>
                    </h1>
                </div>
            )}
        </div>
    );
}

export default GalleryHeader;
