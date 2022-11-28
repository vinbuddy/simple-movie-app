import * as httpRequest from 'src/utils/httpRequest';

export const getGenreList = async (typeName) => {
    try {
        const res = await httpRequest.get(`genre/${typeName}/list`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });

        return res.data.genres;
    } catch (error) {
        console.log(error);
    }
};
