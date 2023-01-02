import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getCredit, getDetail, getSimilar, getVideos } from 'src/apiServices/getInfoService';
import Infor from '../Infor';

function TvInfoPage() {
    const [detail, setDetail] = useState({});
    const [credit, setCredit] = useState({});
    const [videos, setVideos] = useState([]);
    const [similar, setSimilar] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchInfo = async () => {
            const detailResult = await getDetail('tv', id);
            const creditResult = await getCredit('tv', id);
            const videoResult = await getVideos('tv', id);
            const similarResult = await getSimilar('tv', id);

            setDetail(detailResult);
            setCredit(creditResult);
            setVideos(videoResult);
            setSimilar(similarResult);
        };

        fetchInfo();
    }, [id]);

    return (
        <Infor mediaType="tv" detail={detail} credit={credit} videos={videos} similar={similar} />
    );
}

export default TvInfoPage;
