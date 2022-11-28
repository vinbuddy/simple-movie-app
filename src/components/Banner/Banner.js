import { useEffect, useState } from 'react';
import './Banner.scss';
import { BannerItem } from 'src/components/Banner';
import Slide, { Slider } from '../Slider';
import * as trendingService from 'src/apiServices/trendingService';

function Banner() {
    const [trendingResult, setTrendingResult] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            const result = await trendingService.getTrending('all', 'day');
            setTrendingResult(result);
        };

        fetchTrending();
    }, []);

    return (
        <div className="banner-wrapper">
            <Slider
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                loop={true}
                lazy={true}
            >
                {trendingResult.map((result) => (
                    <Slide key={result.id}>
                        <BannerItem data={result} />
                    </Slide>
                ))}
            </Slider>
        </div>
    );
}

export default Banner;
