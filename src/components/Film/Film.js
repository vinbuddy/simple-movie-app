import React, { useContext, useEffect } from 'react';

import { CgRowFirst, CgSpinnerTwoAlt } from 'react-icons/cg';

import Gallery from 'src/components/Gallery';
import GalleryItem from 'src/components/Gallery/GalleryItem';
import GalleryHeader from 'src/components/Gallery/GalleryHeader';

import GenreFilter from 'src/components/Filter/GenreFilter/GenreFilter';
import SortbyFilter from 'src/components/Filter/SortbyFilter/SortbyFilter';

import { FilterContext } from 'src/context/FilterContext';
import Button from 'src/components/Button';

import changeGalleryToRow from 'src/utils/changeGalleryToRow';

import ViewportList from 'react-viewport-list';

function Film({ mediaType }) {
    const { sortOptions, galleryFilter, loadMoreData, loading } = useContext(FilterContext);

    const rows = changeGalleryToRow(galleryFilter);

    const gallery = rows.map((row) => {
        return {
            row: row,
        };
    });

    useEffect(() => {
        document.title = `${mediaType.toUpperCase()} | Simple Movie App`;
    }, []);

    return (
        <div style={{ minHeight: '100vh' }} className="film-wrapper">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="row flex-wrap-reverse">
                        <div className="col-lg-9 col-md-9 col-sm-12 col-12 mb-4 mb-md-4">
                            <GenreFilter genreType={mediaType} />
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-5 mb-md-5">
                            <SortbyFilter sortbyType={mediaType} options={sortOptions} />
                        </div>
                    </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-4 mt-md-4">
                    {galleryFilter.length > 0 ? (
                        <>
                            <GalleryHeader
                                heading={`Results of ${mediaType}`}
                                rightIcon={
                                    loading ? <CgSpinnerTwoAlt className="spin" /> : <CgRowFirst />
                                }
                            />
                            <div className="row">
                                <div className="col-12">
                                    <ViewportList items={gallery}>
                                        {(item, index) => {
                                            return (
                                                <div key={index} className="row">
                                                    {item.row.map((colItem, indexCol) => (
                                                        <div
                                                            key={indexCol}
                                                            className="col-md-1-5 col-md-4 col-sm-6 col-6 pb-4 d-block"
                                                        >
                                                            <GalleryItem
                                                                mediaType={mediaType}
                                                                data={colItem}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        }}
                                    </ViewportList>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '20px 0',
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        loadMoreData(mediaType);
                                    }}
                                    type="outline-basic"
                                    size="large"
                                    rightIcon={loading && <CgSpinnerTwoAlt className="spin" />}
                                >
                                    {loading ? 'Loading' : 'Load More'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="row">
                            <Gallery
                                stateHeading="popular"
                                mediaType={mediaType}
                                heading="Suggest For You"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Film;
