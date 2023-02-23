import * as httpRequest from 'src/utils/httpRequest';

export const getEpisode = async (id, seasonNumber) => {
    try {
        const res = await httpRequest.get(
            `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`,
            {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
