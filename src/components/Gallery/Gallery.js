import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

import GalleryItem from './GalleryItem';
import GalleryHeader from './GalleryHeader';

import { getListMovieAndTv } from 'src/apiServices/getListMovieAndTv';
import Button from '../Button';

const cx = classNames.bind(styles);

function Gallery({ typeName, state, heading, rightIcon }) {
    const [gellery, setGellery] = useState([]);

    useEffect(() => {
        const getGelleryData = async () => {
            const result = await getListMovieAndTv(typeName, state);

            setGellery(result);
        };

        getGelleryData();
    }, []);
    return (
        <div className={cx('col-12', 'gallery-wrapper')}>
            <GalleryHeader heading={heading} rightIcon={rightIcon} />
            <div className={cx('row', 'gallery-list')}>
                {gellery.slice(0, 12).map((gelleryItem) => (
                    <GalleryItem data={gelleryItem} key={gelleryItem.id} />
                ))}
            </div>
        </div>
    );
}

export default Gallery;
