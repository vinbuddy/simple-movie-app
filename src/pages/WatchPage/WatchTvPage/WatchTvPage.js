import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { getRecommend, getDetail } from 'src/services/getInfoService';

import Watch from 'src/components/Watch';

function WatchTvPage() {
    const [recommend, setRecommend] = useState([]);
    const [detail, setDetail] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const fetchRecommend = async () => {
            const recommendResult = await getRecommend('movie', id);
            const detailResult = await getDetail('movie', id);

            setRecommend(recommendResult);
            setDetail(detailResult);
        };

        fetchRecommend();
    }, [id]);

    return <Watch id={id} detail={detail} recommend={recommend} />;
}

export default WatchTvPage;
