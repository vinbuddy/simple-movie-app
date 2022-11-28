import { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/Button';

import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

const cx = classNames.bind(styles);

function GalleryHeader({ seemore, heading, rightIcon, link }) {
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
            {seemore && (
                <Button to="/category" size="mini" type="outline">
                    See more
                </Button>
            )}
        </div>
    );
}

export default memo(GalleryHeader);
