import * as httpRequest from 'src/utils/httpRequest';

export const loadFilterData = async (
    mediaType,
    genreIds,
    sortby = 'popularity.desc',
    pageNum = 1,
) => {
    try {
        const res = await httpRequest.get(`discover/${mediaType}/`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                with_genres: genreIds,
                sort_by: sortby,
                include_adult: false,
                page: pageNum,
            },
        });

        return res.data.results;
    } catch (error) {
        console.log(error);
    }
};

export const loadMoreFilter = async (
    mediaType,
    genreIds,
    sortby = 'popularity.desc',
    pageNum = 1,
) => {
    try {
        const res = await httpRequest.get(`discover/${mediaType}/`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                with_genres: genreIds,
                sort_by: sortby,
                page: pageNum,
            },
        });

        return res.data.results;
    } catch (error) {
        console.log(error);
    }
};
