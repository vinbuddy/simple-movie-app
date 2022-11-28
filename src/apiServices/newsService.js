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

        const newArticles = res.data.articles;
        // Get 10 articles
        newArticles.splice(-90);

        return newArticles;
    } catch (error) {
        console.log(error);
    }
};
