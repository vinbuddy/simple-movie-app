import './MoviePage.scss';
import { useContext, useEffect } from 'react';

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

function MoviePage() {
    const { sortOptions, galleryFilter, loadMoreData, loading } = useContext(FilterContext);

    const rows = changeGalleryToRow(galleryFilter);
    const gallery = rows.map((row) => {
        return {
            row: row,
        };
    });

    useEffect(() => {
        document.title = 'Movie | Simple Movie App';
    }, []);

    return (
        <div className="movie-wrapper">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                            <GenreFilter genreType="movie" />
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                            <SortbyFilter sortbyType="movie" options={sortOptions} />
                        </div>
                    </div>
                </div>

                {/* Gallery filter */}
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <>
                        {galleryFilter.length > 0 ? (
                            <>
                                <GalleryHeader
                                    heading="Results Of Movie"
                                    rightIcon={
                                        loading ? (
                                            <CgSpinnerTwoAlt className="spin" />
                                        ) : (
                                            <CgRowFirst />
                                        )
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
                                                                <GalleryItem data={colItem} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            }}
                                        </ViewportList>
                                    </div>
                                </div>
                                {/* Load more btn */}
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: 30,
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            loadMoreData('movie');
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
                            <Gallery
                                stateHeading="popular"
                                mediaType="movie"
                                heading="Suggest For You🔥"
                                seemore={false}
                            />
                        )}
                    </>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;
