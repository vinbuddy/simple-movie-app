import * as httpRequest from 'src/utils/httpRequest';

export const getTrending = async (mediaType, time) => {
    try {
        const res = await httpRequest.get(`trending/${mediaType}/${time}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });

        return res.data.results;
    } catch (error) {
        console.log(error);
    }
};
