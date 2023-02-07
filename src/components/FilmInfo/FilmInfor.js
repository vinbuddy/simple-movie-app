import React, { useEffect, useRef } from 'react';
import './FilmInfor.scss';
import YouTube from 'react-youtube';

import { BsCalendar4Week, BsCircle } from 'react-icons/bs';
import { TbTimeline } from 'react-icons/tb';
import { BsPlayCircle, BsYoutube } from 'react-icons/bs';
import { RiMedalLine } from 'react-icons/ri';
import { BsPeople } from 'react-icons/bs';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import GalleryItem from 'src/components/Gallery/GalleryItem';
import Button from 'src/components/Button';
import GalleryHeader from 'src/components/Gallery/GalleryHeader';
import { Slider, Slide } from 'src/components/Slider';
import Image from 'src/components/Image';

import { formartDate } from 'src/utils/handleDate';
import images from 'src/assets/images';
import LoadingBar from '../LoadingBar';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function FilmInfo({
    mediaType = 'movie',
    detail = {},
    credit = {},
    videos = [],
    similars = [],
    reviews = [],
    loading = false,
}) {
    const trailerRef = useRef();

    useEffect(() => {
        if (Boolean(detail?.title)) document.title = `${detail?.title}`;
    }, [detail]);

    const scrollToTrailer = () => {
        trailerRef.current.scrollIntoView({ block: 'center' });
    };

    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;
    const date = formartDate(detail?.release_date || detail?.first_air_date);

    const trailer = videos.find(
        (videoItem) =>
            videoItem?.name === 'Official Trailer' || videoItem?.name.includes('Trailer'),
    );

    const fixAvatarPath = (avatarPath) => {
        let path = avatarPath;

        if (!!avatarPath) {
            if (avatarPath.charAt(0) === '/' && avatarPath.includes('/https')) {
                path = path.substring(1);
            } else {
                path = '';
            }
        }

        return path;
    };

    const renderStars = () => {
        let starOutlines = [];
        let starSolids = [];

        let starOutine = { icon: <AiOutlineStar className="info-star-outline" /> };
        let starSolid = { icon: <AiFillStar className="info-star-solid" /> };

        for (let i = 0; i < 5; i++) {
            starSolids[i] = starSolid;
            starOutlines[i] = starOutine;
        }

        return [...starSolids, ...starOutlines];
    };

    const calculateStar = (rating = 0) => {
        const stars = renderStars();
        const finishStar = stars.slice(5 - rating, 10 - rating);

        return finishStar;
    };

    // Star component to render
    const Star = ({ icon }) => {
        return <span>{icon}</span>;
    };

    return (
        <div className="info-wrapper">
            {loading && <LoadingBar height={4} />}

            <SkeletonTheme highlightColor="var(--nav-background)" baseColor="var(--app-background)">
                {/* Background */}
                <div
                    className="info-background"
                    style={{
                        backgroundImage: !!detail?.backdrop_path
                            ? `url(${baseImgURL}${detail?.backdrop_path})`
                            : 'unset',
                    }}
                ></div>

                <div className="info-container">
                    <div className="row">
                        {/* Poster */}
                        <div className="col-12 col-sm-12 col-md-12 col-lg-2">
                            <div className="info-poster-wrapper">
                                <div className="info-poster">
                                    {!!detail?.poster_path ? (
                                        <Image
                                            fallback={images.posterFallback}
                                            src={
                                                detail?.poster_path
                                                    ? `${baseImgURL}${detail?.poster_path}`
                                                    : ''
                                            }
                                            alt="Poster"
                                        />
                                    ) : (
                                        <Skeleton borderRadius={16} height="100%" />
                                    )}
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
                            </div>
                        </div>

                        {/* Info */}
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                            <div className="info-content">
                                <h2 className="info-name" title={detail?.title || detail?.name}>
                                    {detail?.title || detail?.name || <Skeleton width="40%" />}
                                </h2>
                                <p className="info-original-title">
                                    Original title:{' '}
                                    {detail?.original_title || detail?.original_name || (
                                        <Skeleton width="30%" />
                                    )}
                                </p>
                                <ul className="info-genres">
                                    {!!detail?.genres && detail?.genres.length > 0 ? (
                                        detail?.genres.map((genre) => (
                                            <span className="info-genre-item">
                                                <Button key={genre?.id} type="rounded" size="small">
                                                    {genre?.name}
                                                </Button>
                                            </span>
                                        ))
                                    ) : (
                                        <Skeleton width={200} height={40} />
                                    )}
                                </ul>
                                <ul className="info-detail">
                                    <li className="info-detail-item">
                                        <BsCircle className="info-detail-icon" />
                                        <span>Status: {detail?.status}</span>
                                    </li>
                                    <li className="info-detail-item">
                                        <BsCalendar4Week className="info-detail-icon" />
                                        <span>Release: {date}</span>
                                    </li>
                                    <li className="info-detail-item">
                                        <TbTimeline className="info-detail-icon" />
                                        <span>
                                            Runtime:{' '}
                                            {detail?.runtime ||
                                                detail?.last_episode_to_air?.runtime}
                                            min
                                        </span>
                                    </li>
                                    <li className="info-detail-item">
                                        <RiMedalLine className="info-detail-icon" />
                                        <span>Score: {detail?.vote_average}</span>
                                    </li>
                                    <li className="info-detail-item">
                                        <BsPeople className="info-detail-icon" />
                                        <span>Ratings: {detail?.vote_count}</span>
                                    </li>
                                </ul>

                                {/* story */}
                                <div className="info-overview">
                                    <p className="info-overview-content">{detail?.overview}</p>
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
                                            // screen <= 992px
                                            992: {
                                                slidesPerView: 6.5,
                                                spaceBetweenSlides: 30,
                                                slidesPerGroup: 6,
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
                                            credit?.cast.length > 0 &&
                                            credit?.cast.map((castItem, index) => (
                                                <Slide key={index}>
                                                    <div
                                                        key={castItem.id}
                                                        className="info-cast-item"
                                                    >
                                                        <div className="info-cast-avatar">
                                                            <Image
                                                                fallback={images.avatarPlaceholder}
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
                                    <YouTube videoId={trailer?.key} className="info-youtube" />
                                </div>
                            </div>
                        </div>

                        {/* Review */}
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="info-section">
                                <GalleryHeader heading="Review" />

                                <div className="info-review row">
                                    {reviews.map((reviewItem, index) => (
                                        <div key={index} className="info-review-item">
                                            <div className="col-lg-1 col-md-2 d-md-flex d-lg-flex justify-content-md-center justify-content-lg-center d-none d-sm-block d-sm-none d-md-block">
                                                <div className="info-review-avatar">
                                                    <Image
                                                        fallback={images.avatarPlaceholder}
                                                        src={fixAvatarPath(
                                                            reviewItem?.author_details?.avatar_path,
                                                        )}
                                                        alt="Avatar reviewer"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-11 col-md-10 col-sm-12 col-12">
                                                <div className="info-review-section">
                                                    <div className="info-review-header">
                                                        <div className="info-review-author">
                                                            <div
                                                                className="info-review-avatar d-md-none d-lg-block d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none"
                                                                style={{
                                                                    width: 30,
                                                                    height: 30,
                                                                }}
                                                            >
                                                                <Image
                                                                    fallback={
                                                                        images.avatarPlaceholder
                                                                    }
                                                                    src={fixAvatarPath(
                                                                        reviewItem?.author_details
                                                                            ?.avatar_path,
                                                                    )}
                                                                    alt="Avatar reviewer"
                                                                />
                                                            </div>
                                                            <h3 className="info-review-name">
                                                                {reviewItem?.author}
                                                            </h3>
                                                        </div>
                                                        <span className="info-review-stars">
                                                            {!!reviewItem?.author_details?.rating &&
                                                                calculateStar(
                                                                    Math.round(
                                                                        reviewItem?.author_details
                                                                            ?.rating / 2,
                                                                    ),
                                                                ).map((item, index) => (
                                                                    <Star
                                                                        icon={item.icon}
                                                                        key={index}
                                                                    />
                                                                ))}
                                                        </span>
                                                    </div>
                                                    <div className="info-review-cmt">
                                                        <p>{reviewItem?.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                            992: {
                                                slidesPerView: 6.5,
                                                spaceBetweenSlides: 30,
                                                slidesPerGroup: 6,
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
                                                slidesPerView: 2,
                                                spaceBetweenSlides: 20,
                                                slidesPerGroup: 2,
                                            },
                                        }}
                                    >
                                        {similars.map((similarItem, index) => (
                                            <Slide key={index}>
                                                <div className="info-similar-item">
                                                    <GalleryItem
                                                        data={similarItem}
                                                        mediaType={mediaType}
                                                    />
                                                </div>
                                            </Slide>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    );
}

export default FilmInfo;
