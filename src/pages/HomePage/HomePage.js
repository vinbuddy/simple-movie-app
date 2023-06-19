import { useEffect, useState } from 'react';
import './HomePage.scss';
import * as newsService from 'src/services/newsService';

import Slide, { Slider } from 'src/components/Slider';
import { SwipeCard } from 'src/components/SwipeCard';
import SwipeCardItem from 'src/components/SwipeCard/SwipeCardItem';

import { BiTrendingUp } from 'react-icons/bi';
import { BsPlayCircle } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { CgMenuMotion } from 'react-icons/cg';

import Gallery from 'src/components/Gallery';
import Banner from 'src/components/Banner/Banner';

function HomePage() {
    const [newsResult, setNewsResult] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const newsData = await newsService.getNews('movie');

            setNewsResult(newsData);
        };
        document.title = 'Simple Movie App';

        fetchNews();
    }, []);

    return (
        <div className="home-wrapper">
            <div className="row">
                <section className="col-12 banners">
                    <div className="row">
                        <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="banner-trending">
                                <Banner />
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-12 col-12 d-none d-xl-block">
                            <div className="banner-news">
                                <SwipeCard>
                                    <Slider navigation={true}>
                                        {!!newsResult &&
                                            newsResult.map((newsItem, index) => (
                                                <Slide key={index}>
                                                    <SwipeCardItem
                                                        pageNumber={index + 1}
                                                        data={newsItem}
                                                        totalPage={newsResult.length}
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
                            stateHeading="now_playing"
                            mediaType="movie"
                            heading="Now Playing Movie"
                            rightIcon={<BsPlayCircle />}
                        />
                        <Gallery
                            stateHeading="upcoming"
                            mediaType="movie"
                            heading="Upcoming Movie"
                            rightIcon={<AiOutlineFieldTime />}
                        />
                        <Gallery
                            stateHeading="popular"
                            mediaType="tv"
                            heading="Popular TV"
                            rightIcon={<BiTrendingUp />}
                        />
                        <Gallery
                            stateHeading="top_rated"
                            mediaType="tv"
                            heading="Top Rated TV"
                            rightIcon={<CgMenuMotion />}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HomePage;
