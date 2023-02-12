import * as httpRequest from 'src/utils/httpRequest';

export const getNews = async (q) => {
    try {
        const res = await httpRequest.get(
            `https://api.nytimes.com/svc/topstories/v2/movies.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`,
        );
        return res.data.results;
    } catch (error) {
        console.log(error);
    }
};
