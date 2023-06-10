import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

const cx = classNames.bind(styles);

function GalleryHeader({ heading, rightIcon, headerStyles }) {
    return (
        <div style={headerStyles} className={cx('gallery-header')}>
            <h1 className={cx('gallery-heading')}>
                {heading} <span>{rightIcon}</span>
            </h1>
        </div>
    );
}

export default GalleryHeader;
