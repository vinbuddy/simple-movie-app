import { Link } from 'react-router-dom';
import Button from 'src/components/Button';

import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

const cx = classNames.bind(styles);

function GalleryHeader({ heading, rightIcon }) {
    return (
        <div className={cx('gallery-header')}>
            <Link to="/category" className={cx('gallery-heading')}>
                <h1>
                    {heading} <span>{rightIcon}</span>
                </h1>
            </Link>
            <Button to="/category" size="mini" type="outline">
                See more
            </Button>
        </div>
    );
}

export default GalleryHeader;
