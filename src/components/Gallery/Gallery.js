import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

import GalleryItem from './GalleryItem';
import GalleryHeader from './GalleryHeader';

import { getListMovieAndTv } from 'src/apiServices/getListMovieAndTv';
import ViewportList from 'react-viewport-list';
import changeGalleryToRow from 'src/utils/changeGalleryToRow';

const cx = classNames.bind(styles);

function Gallery({ data, mediaType, stateHeading, heading, rightIcon }) {
    const [gallery, setGallery] = useState([]);

    const rows = changeGalleryToRow(gallery);

    const rowGallery = rows.map((row) => {
        return {
            row: row,
        };
    });

    useEffect(() => {
        const getGalleryData = async () => {
            if (stateHeading && mediaType) {
                const result = await getListMovieAndTv(mediaType, stateHeading);
                setGallery(result);
            }
            if (data) {
                setGallery(data);
            }
        };

        getGalleryData();
    }, []);

    return (
        <div className={cx('col-12 col-lg-12 col-md-12 col-sm-12', 'gallery-wrapper')}>
            {stateHeading && <GalleryHeader heading={heading} rightIcon={rightIcon} />}

            <div className={cx('col-12 col-lg-12 col-md-12 col-sm-12')}>
                <ViewportList items={rowGallery}>
                    {(item, index) => {
                        return (
                            <div key={index} className="row">
                                {item.row.map((colItem, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className="col-md-1-5 col-md-4 col-sm-6 col-6 pb-4 d-block"
                                    >
                                        <GalleryItem mediaType={mediaType} data={colItem} />
                                    </div>
                                ))}
                            </div>
                        );
                    }}
                </ViewportList>
            </div>
        </div>
    );
}

export default Gallery;
