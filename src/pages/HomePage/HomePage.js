import { useEffect, useState } from 'react';
import './HomePage.scss';
import * as newsService from 'src/apiServices/newsService';

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
            const newsData = await newsService.getNews('film');
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
                        <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                            <div className="banner-trending">
                                <Banner />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                            <div className="banner-news">
                                <SwipeCard>
                                    <Slider navigation={true}>
                                        {newsResult.map((newsItem, index) => (
                                            <Slide key={newsItem.url}>
                                                <SwipeCardItem
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
