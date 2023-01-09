import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // update param => useLocation
import images from 'src/assets/images';
import './SearchPage.scss';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import GalleryHeader from 'src/components/Gallery/GalleryHeader';
import GalleryItem from 'src/components/Gallery/GalleryItem';
import Button from 'src/components/Button';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

function SearchPage() {
    const { state } = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const [movieResult, setMovieResult] = useState([]);
    const [tvResult, setTvResult] = useState([]);
    const [isResult, setIsResult] = useState(true);
    const [pageNum, setPageNum] = useState(2);
    const [totalPage, setTotalPage] = useState(2);
    const [loading, setLoading] = useState(false);

    // key Bootstrap
    const [key, setKey] = useState(state?.searchParam);

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get(state?.searchParam);

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        if (searchParam) {
            setSearchValue(searchParam);
            setKey(state?.searchParam);
            setPageNum(2);
        }
        document.title = 'Search | Simple Movie App';
    }, [searchParam]);

    useEffect(() => {
        if (searchValue.trim().length <= 0) {
            setTvResult([]);
            setMovieResult([]);
            return;
        }

        const fetchSearchAPI = async () => {
            const searchMovieURL = `${baseURL}search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
                searchValue,
            )}`;
            const searchTvURL = `${baseURL}search/tv?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
                searchValue,
            )}`;

            // call api
            let [movie, tv] = await Promise.all([
                fetch(searchMovieURL).then((res) => res.json()),
                fetch(searchTvURL).then((res) => res.json()),
            ]);

            // no result
            if (movie.total_results === 0 && tv.total_results === 0) {
                setIsResult(false);
            } else {
                setIsResult(true);
            }

            setMovieResult(movie.results);
            setTvResult(tv.results);
        };

        fetchSearchAPI();
    }, [searchValue]);

    const handleSelectTab = (key) => {
        setKey(key);
        setPageNum(2);
        setTotalPage(2);
    };

    // Load more
    const handleLoadMoreData = (mediaType) => {
        const searchURL = `${baseURL}search/${mediaType}?api_key=${apiKey}&language=en-US&page=${pageNum}&include_adult=false&query=${encodeURIComponent(
            searchValue,
        )}`;

        setLoading(true);

        fetch(searchURL)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                if (mediaType === 'movie') {
                    setTotalPage(data.total_pages);
                    setMovieResult((prev) => [...prev, ...data.results]);
                }
                if (mediaType === 'tv') {
                    setTotalPage(data.total_pages);
                    setTvResult((prev) => [...prev, ...data.results]);
                }
            })
            .catch(() => setLoading(false));
    };

    const loadMoreSearchData = (mediaType) => {
        if (pageNum <= totalPage) {
            setPageNum(pageNum + 1);
            handleLoadMoreData(mediaType);
        }
    };

    return (
        <div className="search-wrapper">
            <div className="row">
                <div className="col-12">
                    {searchValue !== '' ? (
                        <h1 className="search-result-heading">
                            Search results for "{searchValue}"
                        </h1>
                    ) : (
                        <div className="search-empty">
                            <img src={images.telescope} alt="" />
                            <h1 className="search-result-heading">Explore interesting films now</h1>
                        </div>
                    )}

                    {isResult && searchValue.length > 0 && (
                        <Tabs activeKey={key} onSelect={handleSelectTab}>
                            {/* Tab all */}
                            <Tab eventKey="search" title="All">
                                <div className="search-result-list">
                                    <section className="search-section row">
                                        <GalleryHeader heading="MOVIE" />
                                        {movieResult.map((result, index) => (
                                            <div
                                                key={index}
                                                className="col-md-1-5 col-md-4 col-sm-6 col-6 pb-4 d-block"
                                            >
                                                <GalleryItem mediaType="movie" data={result} />
                                            </div>
                                        ))}
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: 30,
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    loadMoreSearchData('movie');
                                                }}
                                                type="outline-basic"
                                                size="medium"
                                                rightIcon={
                                                    loading && <CgSpinnerTwoAlt className="spin" />
                                                }
                                            >
                                                {loading ? 'Loading' : 'Load More'}
                                                {/* load more */}
                                            </Button>
                                        </div>
                                    </section>

                                    <section className="search-section row">
                                        <GalleryHeader heading="TV" />
                                        {tvResult.map((result, index) => (
                                            <div
                                                key={index}
                                                className="col-md-1-5 col-md-4 col-sm-6 col-6 pb-4 d-block"
                                            >
                                                <GalleryItem mediaType="tv" data={result} />
                                            </div>
                                        ))}
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: 30,
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    loadMoreSearchData('tv');
                                                }}
                                                type="outline-basic"
                                                size="medium"
                                                rightIcon={
                                                    loading && <CgSpinnerTwoAlt className="spin" />
                                                }
                                            >
                                                {loading ? 'Loading' : 'Load More'}
                                            </Button>
                                        </div>
                                    </section>
                                </div>
                            </Tab>
                            <Tab eventKey="searchmovie" title="Movie">
                                <div className="search-result-list">
                                    <section className="search-section row">
                                        <GalleryHeader heading="MOVIE" />
                                        {movieResult.map((result, index) => (
                                            <div
                                                key={index}
                                                className="col-md-1-5 col-md-4 col-sm-6 col-6 pb-4 d-block"
                                            >
                                                <GalleryItem mediaType="movie" data={result} />
                                            </div>
                                        ))}
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: 30,
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    loadMoreSearchData('movie');
                                                }}
                                                type="outline-basic"
                                                size="medium"
                                                rightIcon={
                                                    loading && <CgSpinnerTwoAlt className="spin" />
                                                }
                                            >
                                                {loading ? 'Loading' : 'Load More'}
                                            </Button>
                                        </div>
                                    </section>
                                </div>
                            </Tab>
                            <Tab eventKey="searchtv" title="TV">
                                <div className="search-result-list">
                                    <section className="search-section row">
                                        <GalleryHeader heading="TV" />
                                        {tvResult.map((result, index) => (
                                            <div
                                                key={index}
                                                className="col-md-1-5 col-md-4 col-sm-6 col-6 pb-4 d-block"
                                            >
                                                <GalleryItem mediaType="tv" data={result} />
                                            </div>
                                        ))}
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: 30,
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    loadMoreSearchData('tv');
                                                }}
                                                type="outline-basic"
                                                size="medium"
                                                rightIcon={
                                                    loading && <CgSpinnerTwoAlt className="spin" />
                                                }
                                            >
                                                {loading ? 'Loading' : 'Load More'}
                                            </Button>
                                        </div>
                                    </section>
                                </div>
                            </Tab>
                        </Tabs>
                    )}

                    {!isResult && searchValue.length > 0 && (
                        <div style={{ textAlign: 'center', marginTop: 60 }}>
                            <img src={images.noResult} alt="" />
                            <h3
                                style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 600,
                                    color: 'var(--text-color)',
                                }}
                            >
                                No Result Found
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
