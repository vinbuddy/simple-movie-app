import * as httpRequest from 'src/utils/httpRequest';

export const getNews = async (q) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const previous = yesterday.toLocaleDateString('en-CA');

    try {
        const res = await httpRequest.get(`https://newsapi.org/v2/everything`, {
            params: {
                q,
                from: previous,
                to: previous,
                sortBy: 'popularity',
                apiKey: process.env.REACT_APP_NEWS_API_KEY,
            },
        });

        return res.data.articles;
    } catch (error) {
        console.log(error);
    }
};
