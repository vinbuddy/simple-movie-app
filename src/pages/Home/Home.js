import { useEffect, useState } from 'react';
import './Home.scss';
import * as trendingService from 'src/apiServices/trendingService';
import * as newsService from 'src/apiServices/newsService';

import Slide, { Slider } from 'src/components/Slider';
import { BannerItem } from 'src/components/BannerItem';
import { SwipeCard } from 'src/components/SwipeCard';
import SwipeCardItem from 'src/components/SwipeCard/SwipeCardItem';

import { BiTrendingUp } from 'react-icons/bi';
import { BsPlayCircle } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { CgMenuMotion } from 'react-icons/cg';

import Gallery from 'src/components/Gallery';

function Home() {
    const [trendingResult, setTrendingResult] = useState([]);
    const [newsResult, setNewsResult] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            const result = await trendingService.getTrending('all', 'day');
            setTrendingResult(result);
        };

        const fetchNews = async () => {
            const newsData = await newsService.getNews('movie');
            setNewsResult(newsData);
        };

        fetchTrending();
        fetchNews();
    }, []);

    return (
        <div className="home-wrapper">
            <div className="row">
                <section className="col-12 banners">
                    <div className="row">
                        <div className="col-8">
                            <div className="banner-trending">
                                <Slider
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    navigation={true}
                                    loop={true}
                                >
                                    {trendingResult.map((result, index) => (
                                        <Slide key={result.id}>
                                            <BannerItem key={result.id} data={result} />
                                        </Slide>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="banner-news">
                                <SwipeCard>
                                    <Slider navigation={true}>
                                        {newsResult.slice(0, 10).map((newsItem, index) => (
                                            <Slide key={newsItem.url}>
                                                <SwipeCardItem
                                                    key={newsItem.url}
                                                    pageNumber={index + 1}
                                                    data={newsItem}
                                                />
                                            </Slide>
                                        ))}
                                    </Slider>
                                </SwipeCard>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery TV, MOVIE */}
                <section className="col-12 gallery">
                    <div className="row">
                        <Gallery
                            state="now_playing"
                            typeName="movie"
                            heading="Now Playing Movie"
                            rightIcon={<BsPlayCircle />}
                        />
                        <Gallery
                            state="upcoming"
                            typeName="movie"
                            heading="Upcoming Movie"
                            rightIcon={<AiOutlineFieldTime />}
                        />
                        <Gallery
                            state="popular"
                            typeName="tv"
                            heading="Popular TV"
                            rightIcon={<BiTrendingUp />}
                        />
                        <Gallery
                            state="top_rated"
                            typeName="tv"
                            heading="Top Rated TV"
                            rightIcon={<CgMenuMotion />}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
