import { useEffect, useState, memo } from 'react';

import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

import GalleryItem from './GalleryItem';
import GalleryHeader from './GalleryHeader';

import { getListMovieAndTv } from 'src/apiServices/getListMovieAndTv';
import ViewportList from 'react-viewport-list';
import changeGalleryToRow from 'src/utils/changeGalleryToRow';

const cx = classNames.bind(styles);

function Gallery({ data, typeName, stateHeading, heading, seemore = true, rightIcon }) {
    const [gallery, setGallery] = useState([]);

    const rows = changeGalleryToRow(gallery);
    const rowGallery = rows.map((row) => {
        return {
            row: row,
        };
    });

    useEffect(() => {
        const getGalleryData = async () => {
            if ((stateHeading, typeName)) {
                const result = await getListMovieAndTv(typeName, stateHeading);
                setGallery(result);
            }
            if (data) {
                setGallery(data);
            }
        };

        getGalleryData();
    }, []);
    return (
        <div className={cx('col-12', 'gallery-wrapper')}>
            {stateHeading && (
                <GalleryHeader seemore={seemore} heading={heading} rightIcon={rightIcon} />
            )}
            <ViewportList items={rowGallery} scrollThreshold={40}>
                {(item, index) => {
                    return (
                        <div key={index} className="row">
                            {item.row.map((colItem, colIndex) => (
                                <div
                                    key={colIndex}
                                    className="col-md-1-5 col-md-4 col-sm-6 col-6 pb-4 d-block"
                                >
                                    {/* "col-md-1-5 col-md-4 col-sm-3 col-4 pb-4 d-block" */}
                                    <GalleryItem data={colItem} />
                                </div>
                            ))}
                        </div>
                    );
                }}
            </ViewportList>
        </div>
    );
}

export default memo(Gallery);
