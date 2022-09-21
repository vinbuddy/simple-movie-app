import { useState, useEffect, useRef } from 'react';
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

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [movieResult, setMovieResult] = useState([]);
    const [tvResult, setTvResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResult, setNoResult] = useState(false);

    const [showResult, setShowResult] = useState(true);

    const debouncedSearch = useDebounce(searchValue, 700);

    const inputRef = useRef();

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

            const searchMovieURL = `${baseURL}search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${debouncedSearch}`;
            const searchTvURL = `${baseURL}search/tv?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${debouncedSearch}`;

            // call api
            let [movie, tv] = await Promise.all([
                fetch(searchMovieURL).then((res) => res.json()),
                fetch(searchTvURL).then((res) => res.json()),
            ]);

            setLoading(false);

            // no result
            if (movie.total_results === 0 || tv.total_results === 0) {
                setNoResult(true);
            } else {
                setNoResult(false);
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

        setNoResult(false);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div>
            <Tippy
                onClickOutside={handleHideResult}
                visible={
                    (showResult && movieResult.length > 0) || (showResult && tvResult.length > 0)
                }
                interactive={true}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperFrame>
                            <div className={cx('search-inner')}>
                                <div className={cx('search-type')}>
                                    <header className={cx('search-header')}>
                                        <h4 className={cx('search-heading')}>
                                            Movie for {searchValue}
                                        </h4>
                                        <Link className={cx('search-detail')} to="/search">
                                            See more
                                            <MdOpenInNew style={{ marginLeft: 3 }} />
                                        </Link>
                                    </header>
                                    {/* Movie */}
                                    {movieResult.map((result) => (
                                        <SearchItem key={result.id} data={result} />
                                    ))}
                                </div>

                                <div className={cx('search-type')}>
                                    <header className={cx('search-header')}>
                                        <h4 className={cx('search-heading')}>
                                            Tv for {searchValue}
                                        </h4>
                                        <Link className={cx('search-detail')} to="/search">
                                            See more
                                            <MdOpenInNew style={{ marginLeft: 3 }} />
                                        </Link>
                                    </header>
                                    {/* Tv api */}
                                    {tvResult.map((result) => (
                                        <SearchItem key={result.id} data={result} />
                                    ))}
                                </div>
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
                        value={searchValue}
                        spellCheck={false}
                        placeholder="Search movie..."
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <HiX className={cx('clear-icon')} />
                        </button>
                    )}

                    {loading && <div className={cx('loading')}></div>}

                    {/* No result */}
                    {noResult && searchValue !== '' && (
                        <div className={cx('no-result')}>
                            <PopperFrame>
                                <img src={images.noResult} alt="" />
                                <h3>No Result Found</h3>
                            </PopperFrame>
                        </div>
                    )}
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
