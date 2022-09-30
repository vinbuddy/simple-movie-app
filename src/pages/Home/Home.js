import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { BannerTrendingItem } from 'src/components/BannerTrendingItem';
import * as getTrendingService from 'src/apiServices/getTrendingService';
import Slide, { Slider } from 'src/components/Slider';

const cx = classNames.bind(styles);

function Home() {
    const [trendingResult, setTrendingResult] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            const result = await getTrendingService.getTrending('all', 'day');
            setTrendingResult(result);
        };

        fetchTrending();
    }, []);

    return (
        <div className={cx('home-wrapper')}>
            <section className={cx('banners')}>
                <div className="row">
                    <div className="col-8">
                        <div className={cx('banner-trending')}>
                            {/* Get 7 item */}
                            <Slider>
                                {trendingResult.map((result, index) => (
                                    <Slide key={index}>
                                        <BannerTrendingItem key={result.id} data={result} />
                                    </Slide>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className={cx('banner-news')}></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
