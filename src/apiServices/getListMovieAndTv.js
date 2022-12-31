import * as httpRequest from 'src/utils/httpRequest';

export const getListMovieAndTv = async (mediaType, state) => {
    try {
        const res = await httpRequest.get(`${mediaType}/${state}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });

        return res.data.results;
    } catch (error) {
        console.log(error);
    }
};
