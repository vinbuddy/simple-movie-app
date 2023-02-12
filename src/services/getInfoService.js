import * as httpRequest from 'src/utils/httpRequest';

export const getDetail = async (mediaType, id) => {
    try {
        const res = await httpRequest.get(`${mediaType}/${id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCredit = async (mediaType, id) => {
    try {
        const res = await httpRequest.get(`${mediaType}/${id}/credits`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getVideos = async (mediaType, id) => {
    try {
        const res = await httpRequest.get(`${mediaType}/${id}/videos`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });

        return res.data.results;
    } catch (error) {
        console.log(error);
    }
};

export const getSimilar = async (mediaType, id) => {
    try {
        const res = await httpRequest.get(`${mediaType}/${id}/similar`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });

        return res.data.results;
    } catch (error) {
        console.log(error);
    }
};

export const getReview = async (mediaType, id) => {
    try {
        const res = await httpRequest.get(`${mediaType}/${id}/reviews`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });

        return res.data.results;
    } catch (error) {
        console.log(error);
    }
};
