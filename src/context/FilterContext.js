import { useState, createContext, useCallback, useLayoutEffect } from 'react';

import { loadFilterData, loadMoreFilter } from 'src/services/filterService';

const FilterContext = createContext();

const PAGE_LIMIT = 40;
const sortOptions = [
    { value: 'vote_average.desc', label: 'Top Rated ⭐' },
    { value: 'release_date.desc', label: 'Release Date 📅' },
    { value: 'vote_count.desc', label: 'Likes 👍' },
];

// Provide "Genre, Sortby" to another component
function FilterProvider({ children }) {
    const [galleryFilter, setGalleryFilter] = useState([]);
    const [currentGenres, setCurrentGenres] = useState([]);
    const [currentSortby, setCurrentSortby] = useState('popularity.desc');
    const [pageNum, setPageNum] = useState(2);
    const [loading, setLoading] = useState(false);

    // callback when click genre
    const fetchGenreData = async (typeGenre, genreActive) => {
        setLoading(true);
        if (genreActive.length) {
            let genreIdString = genreActive.toString();

            const result = await loadFilterData(typeGenre, genreIdString, currentSortby);

            setCurrentGenres(genreActive);
            setGalleryFilter(result);

            setLoading(false);
        } else {
            setGalleryFilter([]);
            setCurrentGenres(genreActive);
        }
    };

    // callback when click sortby
    const fetchSortbyData = async (sortbyType, sortbySelected) => {
        let genreIdString = currentGenres.toString();

        setLoading(true);
        if (sortbySelected) {
            const result = await loadFilterData(sortbyType, genreIdString, sortbySelected);
            setCurrentSortby(sortbySelected);
            setGalleryFilter(result);

            setLoading(false);
        } else {
            setCurrentSortby('popularity.desc');

            setLoading(false);

            if (currentGenres.length) {
                setGalleryFilter((prev) => [...prev]);
            } else {
                setGalleryFilter([]);
            }
        }
    };

    const loadDataFilter = async (mediaType) => {
        setLoading(true);
        if (currentGenres.length || currentSortby.length > 0) {
            let genreIdString = currentGenres.toString();
            const result = await loadMoreFilter(mediaType, genreIdString, currentSortby, pageNum);

            setGalleryFilter((prev) => [...prev, ...result]); // concat newList + oldList
            setLoading(false);
        } else {
            return;
        }
    };

    const loadMoreData = useCallback(
        (mediaType) => {
            if (pageNum <= PAGE_LIMIT) {
                setPageNum(pageNum + 1);
                loadDataFilter(mediaType);
            }
        },
        [pageNum],
    );

    const filterData = {
        PAGE_LIMIT,
        sortOptions,
        galleryFilter,
        currentGenres,
        currentSortby,
        pageNum,
        loading,
        fetchGenreData,
        fetchSortbyData,
        loadDataFilter,
        loadMoreData,
    };

    return <FilterContext.Provider value={filterData}>{children}</FilterContext.Provider>;
}

export { FilterContext, FilterProvider };
