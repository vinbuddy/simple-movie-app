import { useEffect, useState, useContext } from 'react';

import classNames from 'classnames/bind';
import styles from '../Filter.module.scss';

import { getGenreList } from 'src/apiServices/genresService';

import GenreItem from './GenreItem';
import { FilterContext } from 'src/context/FilterContext';

const cx = classNames.bind(styles);

function GenreFilter({ genreType }) {
    const [genres, setGenres] = useState([]);
    const [genreActive, setGenreActive] = useState([]);
    const { fetchGenreData } = useContext(FilterContext);

    // Get genre list
    useEffect(() => {
        const getGenreData = async () => {
            const result = await getGenreList(genreType);
            setGenres(result);
        };
        getGenreData();
    }, []);

    // Call api when user click or change GenreBtn
    useEffect(() => {
        fetchGenreData(genreType, genreActive);
    }, [genreActive]);

    const handleFilterGenre = (genreId) => {
        let isActive = genreActive.includes(genreId);

        setGenreActive((prev) => {
            if (isActive) {
                let prevActive = genreActive.filter((activeId) => activeId !== genreId);

                return prevActive;
            } else {
                let newActive = [...prev, genreId];

                return newActive;
            }
        });
    };

    return (
        <div className={cx('genre-wrapper')}>
            {genres
                .filter((genre) => genre.name !== 'Romance')
                .map((genre) => {
                    return (
                        <GenreItem
                            key={genre.id}
                            active={genreActive.includes(genre.id)}
                            onClick={() => {
                                handleFilterGenre(genre.id);
                            }}
                            genreName={genre.name}
                        />
                    );
                })}
        </div>
    );
}

export default GenreFilter;
