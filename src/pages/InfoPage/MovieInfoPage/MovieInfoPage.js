import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
    getCredit,
    getDetail,
    getReview,
    getSimilar,
    getVideos,
} from 'src/apiServices/getInfoService';
import FilmInfo from 'src/components/FilmInfo';

function MovieInfoPage() {
    const [detail, setDetail] = useState({});
    const [credit, setCredit] = useState({});
    const [videos, setVideos] = useState([]);
    const [similars, setSimilars] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchInfo = async () => {
            setLoading(true);

            const detailResult = await getDetail('movie', id);
            const creditResult = await getCredit('movie', id);
            const videoResult = await getVideos('movie', id);
            const similarResult = await getSimilar('movie', id);
            const reviewResult = await getReview('movie', id);

            setLoading(false);

            setDetail(detailResult);
            setCredit(creditResult);
            setVideos(videoResult);
            setSimilars(similarResult);
            setReviews(reviewResult);
        };

        fetchInfo();
    }, [id]);

    return (
        <FilmInfo
            id={id}
            mediaType="movie"
            detail={detail}
            credit={credit}
            videos={videos}
            similars={similars}
            reviews={reviews}
            loading={loading}
        />
    );
}

export default MovieInfoPage;
