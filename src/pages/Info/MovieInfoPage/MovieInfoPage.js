import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getCredit, getDetail, getSimilar, getVideos } from 'src/apiServices/getInfo';
import Infor from '../Infor';

function MovieInfoPage() {
    const [detail, setDetail] = useState({});
    const [credit, setCredit] = useState({});
    const [videos, setVideos] = useState([]);
    const [similar, setSimilar] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchInfo = async () => {
            const detailResult = await getDetail('movie', id);
            const creditResult = await getCredit('movie', id);
            const videoResult = await getVideos('movie', id);

            const similarResult = await getSimilar('movie', id);

            setDetail(detailResult);
            setCredit(creditResult);
            setVideos(videoResult);
            setSimilar(similarResult);
        };

        fetchInfo();
    }, [id]);

    return <Infor detail={detail} credit={credit} videos={videos} similar={similar} />;
}

export default MovieInfoPage;
