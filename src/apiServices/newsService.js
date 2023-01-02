import * as httpRequest from 'src/utils/httpRequest';

export const getNews = async (q) => {
    try {
        const res = await httpRequest.get(
            `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
            {
                params: {
                    q,
                    'api-key': process.env.REACT_APP_NEWS_API_KEY,
                },
            },
        );

        return res.data.response.docs;
    } catch (error) {
        console.log(error);
    }
};
