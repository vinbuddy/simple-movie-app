import * as httpRequest from 'src/utils/httpRequest';

export const getListMovieAndTv = async (typeName, state) => {
    try {
        const res = await httpRequest.get(`${typeName}/${state}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });

        return res.data.results;
    } catch (error) {
        console.log(error);
    }
};
