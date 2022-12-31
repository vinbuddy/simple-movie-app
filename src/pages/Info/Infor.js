import { useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import YouTube from 'react-youtube';

import './Infor.scss';

import { BsCalendar4Week, BsCircle } from 'react-icons/bs';
import { TbTimeline } from 'react-icons/tb';
import { BsPlayCircle, BsYoutube } from 'react-icons/bs';

import GalleryItem from 'src/components/Gallery/GalleryItem';
import Button from 'src/components/Button';
import GalleryHeader from 'src/components/Gallery/GalleryHeader';
import { Slider, Slide } from 'src/components/Slider';
import Image from 'src/components/Image';

import { formartDate } from 'src/utils/handleDate';

function Infor({ detail = {}, credit = {}, videos = [], similar = [] }) {
    const trailerRef = useRef();

    const scrollToTrailer = () => {
        trailerRef.current.scrollIntoView({ block: 'center' });
    };

    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;
    const date = formartDate(detail?.release_date || detail?.first_air_date);
    const trailerVideo = videos.find((videoItem) => videoItem.name === 'Official Trailer');

    return (
        <div className="info-wrapper">
            <div
                className="info-background"
                style={{
                    backgroundImage: `url(${baseImgURL}${detail?.backdrop_path})`,
                }}
            ></div>

            <div className="info-container">
                <div className="row">
                    {/* Poster */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-2">
                        <div className="info-poster-wrapper">
                            <div className="info-poster">
                                <Image src={`${baseImgURL}${detail?.poster_path}`} alt="Poster" />
                            </div>
                            <div className="info-button">
                                <Button
                                    onClick={scrollToTrailer}
                                    leftIcon={<BsYoutube />}
                                    type="outline-basic"
                                >
                                    Trailer
                                </Button>
                                <Button leftIcon={<BsPlayCircle />} type="primary">
                                    Watch
                                </Button>
                            </div>

                            <div className="info-rating">
                                <div className="info-rating-process">
                                    <CircularProgressbar
                                        styles={buildStyles({
                                            pathColor: '#f37515',
                                            textColor: 'var(--text-color)',
                                            textSize: '2.8rem',
                                        })}
                                        value={(detail?.vote_average / 10) * 100}
                                        maxValue={100}
                                        text={`${Math.floor((detail?.vote_average / 10) * 100)}%`}
                                    />
                                </div>
                                <div className="info-rating-detail">
                                    <p>
                                        <span>{detail?.vote_count}</span> ratings
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                        <div className="info-content">
                            <h2 className="info-name">{detail?.title}</h2>
                            <p className="info-original-title">
                                Original title: {detail?.original_title}
                            </p>
                            <ul className="info-genres">
                                {!!detail?.genres &&
                                    detail?.genres.map((genre) => (
                                        <Button key={genre?.id} type="rounded" size="small">
                                            {genre?.name}
                                        </Button>
                                    ))}
                            </ul>
                            <ul className="info-detail">
                                <li className="info-detail-item">
                                    <BsCircle className="info-detail-icon" />
                                    <span>Status: {detail?.status}</span>
                                </li>
                                <li className="info-detail-item">
                                    <BsCalendar4Week className="info-detail-icon" />
                                    <span>Release date: {date}</span>
                                </li>
                                <li className="info-detail-item">
                                    <TbTimeline className="info-detail-icon" />
                                    <span>Runtime: {detail?.runtime} min</span>
                                </li>
                            </ul>

                            {/* story */}
                            <div className="info-overview">
                                <h2 className="info-overview-heading">Content:</h2>
                                <p>{detail?.overview}</p>
                            </div>
                        </div>
                    </div>

                    {/* Cast */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                        <div className="info-section">
                            <GalleryHeader heading="Cast" />

                            <div className="info-cast-list">
                                <Slider
                                    navigation={true}
                                    slidesPerView={6.5}
                                    observer={true}
                                    spaceBetween={25}
                                    observeParents={true}
                                    breakpoints={{
                                        // width >= 1200px
                                        992: {
                                            slidesPerView: 6.5,
                                            spaceBetweenSlides: 30,
                                            slidesPerGroup: 6,
                                        },
                                        991: {
                                            slidesPerView: 5,
                                            spaceBetweenSlides: 20,
                                            slidesPerGroup: 5,
                                        },
                                        768: {
                                            slidesPerView: 4.5,
                                            spaceBetweenSlides: 20,
                                            slidesPerGroup: 4,
                                        },
                                        576: {
                                            slidesPerView: 3.5,
                                            spaceBetweenSlides: 20,
                                            slidesPerGroup: 3,
                                        },
                                        100: {
                                            slidesPerView: 2.5,
                                            spaceBetweenSlides: 20,
                                            slidesPerGroup: 2,
                                        },
                                    }}
                                >
                                    {!!credit?.cast &&
                                        credit?.cast.map((castItem, index) => (
                                            <Slide key={index}>
                                                <div key={castItem.id} className="info-cast-item">
                                                    <div className="info-cast-avatar">
                                                        <Image
                                                            src={`${baseImgURL}${castItem?.profile_path}`}
                                                            alt="cast profile"
                                                        />
                                                    </div>
                                                    <h3 className="info-cast-name">
                                                        {castItem?.name}
                                                    </h3>
                                                    <p className="info-cast-role">
                                                        {castItem?.character}
                                                    </p>
                                                </div>
                                            </Slide>
                                        ))}
                                </Slider>
                            </div>
                        </div>
                    </div>

                    {/* Trailer */}
                    <div ref={trailerRef} className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="info-section">
                            <GalleryHeader heading="Trailer" />

                            <div className="info-player">
                                <YouTube videoId={trailerVideo?.key} className="info-youtube" />
                            </div>
                        </div>
                    </div>

                    {/* Similar */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="info-section">
                            <GalleryHeader heading="Similar" />

                            <div className="info-similar-list">
                                <Slider
                                    navigation={true}
                                    slidesPerView={6.5}
                                    observer={true}
                                    spaceBetween={25}
                                    observeParents={true}
                                    breakpoints={{
                                        // width >= 1200px
                                        992: {
                                            slidesPerView: 6.5,
                                            spaceBetweenSlides: 30,
                                            slidesPerGroup: 6,
                                        },
                                        991: {
                                            slidesPerView: 5,
                                            spaceBetweenSlides: 20,
                                            slidesPerGroup: 5,
                                        },
                                        768: {
                                            slidesPerView: 4.5,
                                            spaceBetweenSlides: 20,
                                            slidesPerGroup: 4,
                                        },
                                        576: {
                                            slidesPerView: 3.5,
                                            spaceBetweenSlides: 20,
                                            slidesPerGroup: 3,
                                        },
                                        100: {
                                            slidesPerView: 2.5,
                                            spaceBetweenSlides: 20,
                                            slidesPerGroup: 2,
                                        },
                                    }}
                                >
                                    {similar.map((similarItem, index) => (
                                        <Slide key={index}>
                                            <div className="info-similar-item">
                                                <GalleryItem data={similarItem} mediaType="movie" />
                                            </div>
                                        </Slide>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Infor;
