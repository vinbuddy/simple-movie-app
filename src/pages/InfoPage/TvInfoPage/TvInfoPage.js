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

function TvInfoPage() {
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

            const detailResult = await getDetail('tv', id);
            const creditResult = await getCredit('tv', id);
            const videoResult = await getVideos('tv', id);
            const similarResult = await getSimilar('tv', id);
            const reviewResult = await getReview('tv', id);

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
            mediaType="tv"
            detail={detail}
            credit={credit}
            videos={videos}
            similars={similars}
            reviews={reviews}
            loading={loading}
        />
    );
}

export default TvInfoPage;
