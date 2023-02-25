import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

// icons
import { FiSearch } from 'react-icons/fi';
import { HiX } from 'react-icons/hi';
import { MdOpenInNew } from 'react-icons/md';

import PopperFrame from 'src/components/Popper';
import SearchItem from 'src/components/SearchItem';

// custom hooks
import { useDebounce } from 'src/hooks';

import images from 'src/assets/images';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import LoadingBar from 'src/components/LoadingBar';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [movieResult, setMovieResult] = useState([]);
    const [tvResult, setTvResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const inputRef = useRef();

    const navigateSearch = useNavigate();

    const debouncedSearch = useDebounce(searchValue, 700);

    useEffect(() => {
        if (debouncedSearch.trim().length <= 0) {
            setTvResult([]);
            setMovieResult([]);

            return;
        }

        const apiKey = process.env.REACT_APP_API_KEY;
        const baseURL = process.env.REACT_APP_BASE_URL;

        const fetchSearchAPI = async () => {
            setLoading(true);

            const searchMovieURL = `${baseURL}search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
                debouncedSearch,
            )}`;
            const searchTvURL = `${baseURL}search/tv?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
                debouncedSearch,
            )}`;

            // call api
            let [movie, tv] = await Promise.all([
                fetch(searchMovieURL).then((res) => res.json()),
                fetch(searchTvURL).then((res) => res.json()),
            ]);

            setLoading(false);

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
    }, [debouncedSearch]);

    const handleClear = () => {
        setSearchValue('');
        setMovieResult([]);
        setTvResult([]);

        // setIsResult(true);
        setLoading(false);
        setIsResult(false);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleHideResultNavigate = () => {
        setShowResult(false);
        setSearchValue('');
        inputRef.current.blur();
    };

    const handleNavigateSearch = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            navigateSearch(
                {
                    pathname: '/search',
                    search: `?search=${searchValue}`,
                },
                {
                    replace: true,
                    state: {
                        searchParam: 'search',
                    },
                },
            );

            // clear, hide, remove focus when navigate
            setShowResult(false);
            setSearchValue('');
            inputRef.current.blur();
        }
    };

    return (
        <div id="search" className={cx('search-area')}>
            <Tippy
                placement="bottom-start"
                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
                onClickOutside={handleHideResult}
                visible={showResult && searchValue.length > 0}
                interactive={true}
                appendTo="parent"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperFrame>
                            <div className={cx('search-inner')}>
                                {isResult && (
                                    <div>
                                        {/* movie  */}
                                        <div className={cx('search-type')}>
                                            <header className={cx('search-header')}>
                                                <h4 className={cx('search-heading')}>
                                                    Movie for {searchValue}
                                                </h4>
                                                <Link
                                                    className={cx('search-detail')}
                                                    to={{
                                                        pathname: '/search',
                                                        search: `?searchmovie=${searchValue}`,
                                                    }}
                                                    state={{ searchParam: 'searchmovie' }}
                                                    onClick={() => handleHideResultNavigate()}
                                                >
                                                    See more
                                                    <MdOpenInNew style={{ marginLeft: 3 }} />
                                                </Link>
                                            </header>
                                            {movieResult.map((result) => (
                                                <LazyLoadComponent key={result.id} threshold={70}>
                                                    <SearchItem
                                                        onClick={handleHideResultNavigate}
                                                        mediaType="movie"
                                                        data={result}
                                                    />
                                                </LazyLoadComponent>
                                            ))}
                                        </div>

                                        {/* tv */}
                                        <div className={cx('search-type')}>
                                            <header className={cx('search-header')}>
                                                <h4 className={cx('search-heading')}>
                                                    Tv for {searchValue}
                                                </h4>
                                                <Link
                                                    className={cx('search-detail')}
                                                    to={{
                                                        pathname: '/search',
                                                        search: `?searchtv=${searchValue}`,
                                                    }}
                                                    state={{ searchParam: 'searchtv' }}
                                                    onClick={() => handleHideResultNavigate()}
                                                >
                                                    See more
                                                    <MdOpenInNew style={{ marginLeft: 3 }} />
                                                </Link>
                                            </header>
                                            {/* Tv api */}
                                            {tvResult.map((result) => (
                                                <LazyLoadComponent key={result.id} threshold={70}>
                                                    <SearchItem
                                                        onClick={handleHideResultNavigate}
                                                        mediaType="tv"
                                                        data={result}
                                                    />
                                                </LazyLoadComponent>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {!isResult && (
                                    <div className={cx('no-result')}>
                                        {!loading && (
                                            <img
                                                className={cx('no-result-img')}
                                                src={images.noResult}
                                                alt=""
                                            />
                                        )}
                                        <h3>{loading ? 'Searching' : 'No Result Found'} </h3>
                                    </div>
                                )}
                            </div>
                        </PopperFrame>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    {!!searchValue || <FiSearch className={cx('search-icon')} />}
                    <input
                        className={cx('search-input')}
                        ref={inputRef}
                        value={searchValue.trimStart()}
                        spellCheck={false}
                        placeholder="Search movie, tv..."
                        onChange={(e) => {
                            setLoading(true);
                            setSearchValue(e.target.value);
                        }}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                        onKeyUp={handleNavigateSearch}
                        onBlur={() => setLoading(false)}
                    />
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <HiX className={cx('clear-icon')} />
                        </button>
                    )}

                    {loading && (
                        <LoadingBar className={cx('hide-loading-mobile')} top="100%" width="100%" />
                    )}
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
