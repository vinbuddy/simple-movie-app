import React, { useEffect, useRef } from 'react';
import styles from './FilmInfor.module.scss';
import classNames from 'classnames/bind';
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
// import 'react-loading-skeleton/dist/skeleton.css';
import GenreInfor from './GenreInfor';
import OverviewInfo from './OverviewInfor';

const cx = classNames.bind(styles);

function FilmInfo({
    id,
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

        let starOutine = { icon: <AiOutlineStar className={cx('info-star-outline')} /> };
        let starSolid = { icon: <AiFillStar className={cx('info-star-solid')} /> };

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
        <div className={cx('info-wrapper')}>
            {loading && <LoadingBar height={4} />}
            {/* Background */}
            {!!detail?.backdrop_path ? (
                <div
                    className={cx('info-background')}
                    style={{
                        backgroundImage: !!detail?.backdrop_path
                            ? `url(${baseImgURL}${detail?.backdrop_path})`
                            : 'unset',
                    }}
                ></div>
            ) : (
                <Skeleton height={400} />
            )}

            <div className={cx('info-container')}>
                <div className="row">
                    {/* Poster */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-2">
                        <div className={cx('info-poster-wrapper')}>
                            <div className={cx('info-poster')}>
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
                                    <Skeleton
                                        style={{ border: '5px solid var(--app-background)' }}
                                        borderRadius={16}
                                        height="100%"
                                    />
                                )}
                            </div>
                            <div className={cx('info-button')}>
                                <Button
                                    onClick={scrollToTrailer}
                                    leftIcon={<BsYoutube />}
                                    type="outline-basic"
                                >
                                    Trailer
                                </Button>
                                <Button
                                    to={`/watch/${mediaType}/${id}`}
                                    leftIcon={<BsPlayCircle />}
                                    type="primary"
                                >
                                    Watch
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                        <div className={cx('info-content')}>
                            <h2 className={cx('info-name')} title={detail?.title || detail?.name}>
                                {detail?.title || detail?.name || <Skeleton width="40%" />}
                            </h2>
                            <p className={cx('info-original-title')}>
                                {detail?.original_title || detail?.original_name || (
                                    <Skeleton width="33%" />
                                )}
                            </p>
                            <ul className={cx('info-genres')}>
                                {!!detail?.genres && detail?.genres.length > 0 ? (
                                    detail?.genres.map((genre) => (
                                        <GenreInfor key={genre.id} name={genre.name} />
                                    ))
                                ) : (
                                    <Skeleton width={200} height={40} />
                                )}
                            </ul>
                            <ul className={cx('info-detail')}>
                                <li className={cx('info-detail-item')}>
                                    <BsCircle className={cx('info-detail-icon')} />
                                    <span>Status: {detail?.status}</span>
                                </li>
                                <li className={cx('info-detail-item')}>
                                    <BsCalendar4Week className={cx('info-detail-icon')} />
                                    <span>Release: {date}</span>
                                </li>
                                <li className={cx('info-detail-item')}>
                                    <TbTimeline className={cx('info-detail-icon')} />
                                    <span>
                                        Runtime:{' '}
                                        {detail?.runtime || detail?.last_episode_to_air?.runtime}
                                        min
                                    </span>
                                </li>
                                <li className={cx('info-detail-item')}>
                                    <RiMedalLine className={cx('info-detail-icon')} />
                                    <span>Score: {detail?.vote_average}</span>
                                </li>
                                <li className={cx('info-detail-item')}>
                                    <BsPeople className={cx('info-detail-icon')} />
                                    <span>Ratings: {detail?.vote_count}</span>
                                </li>
                            </ul>

                            {/* story */}
                            <OverviewInfo>{detail?.overview}</OverviewInfo>
                        </div>
                    </div>

                    {/* Cast */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                        <div className={cx('info-section')}>
                            <GalleryHeader heading="Cast" />

                            <div className={cx('info-cast-list')}>
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
                                                    className={cx('info-cast-item')}
                                                >
                                                    <div className={cx('info-cast-avatar')}>
                                                        <Image
                                                            fallback={images.avatarPlaceholder}
                                                            src={`${baseImgURL}${castItem?.profile_path}`}
                                                            alt="cast profile"
                                                        />
                                                    </div>
                                                    <h3 className={cx('info-cast-name')}>
                                                        {castItem?.name}
                                                    </h3>
                                                    <p className={cx('info-cast-role')}>
                                                        {castItem?.character}
                                                    </p>
                                                </div>
                                            </Slide>
                                        ))}
                                </Slider>
                            </div>

                            {!!credit?.cast && credit?.cast.length === 0 && (
                                <p className={cx('info-no-result')}>No Cast</p>
                            )}
                        </div>
                    </div>

                    {/* Trailer */}
                    <div ref={trailerRef} className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className={cx('info-section')}>
                            <GalleryHeader heading="Trailer" />

                            <div className={cx('info-player')}>
                                <YouTube videoId={trailer?.key} className={cx('info-youtube')} />
                            </div>
                        </div>
                    </div>

                    {/* Review */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className={cx('info-section')}>
                            <GalleryHeader heading="Review" />

                            <div className={cx('info-review', 'row')}>
                                {reviews.map((reviewItem, index) => (
                                    <div key={index} className={cx('info-review-item')}>
                                        <div className="col-lg-1 col-md-2 d-md-flex d-lg-flex justify-content-md-center justify-content-lg-center d-none d-sm-block d-sm-none d-md-block">
                                            <div className={cx('info-review-avatar')}>
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
                                            <div className={cx('info-review-section')}>
                                                <div className={cx('info-review-header')}>
                                                    <div className={cx('info-review-author')}>
                                                        <div
                                                            className={cx(
                                                                'info-review-avatar',
                                                                'd-md-none d-lg-block d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none',
                                                            )}
                                                            style={{
                                                                width: 30,
                                                                height: 30,
                                                            }}
                                                        >
                                                            <Image
                                                                fallback={images.avatarPlaceholder}
                                                                src={fixAvatarPath(
                                                                    reviewItem?.author_details
                                                                        ?.avatar_path,
                                                                )}
                                                                alt="Avatar reviewer"
                                                            />
                                                        </div>
                                                        <h3 className={cx('info-review-name')}>
                                                            {reviewItem?.author}
                                                        </h3>
                                                    </div>
                                                    <span className={cx('info-review-stars')}>
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
                                                <div className={cx('info-review-cmt')}>
                                                    <p>{reviewItem?.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {reviews.length === 0 && (
                                <p className={cx('info-no-result')}>No review</p>
                            )}
                        </div>
                    </div>

                    {/* Similar */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className={cx('info-section')}>
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

                            {similars.length === 0 && (
                                <p className={cx('info-no-result')}>No Similar List</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilmInfo;
