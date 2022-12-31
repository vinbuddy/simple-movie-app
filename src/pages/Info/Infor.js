import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './Infor.scss';

import { BsCalendar4Week, BsCircle } from 'react-icons/bs';
import { TbTimeline } from 'react-icons/tb';
import { TiStarFullOutline } from 'react-icons/ti';
import { BsPlayCircle, BsYoutube } from 'react-icons/bs';
import { VscBook } from 'react-icons/vsc';

import Button from 'src/components/Button';
import GalleryHeader from 'src/components/Gallery/GalleryHeader';
import { Slider, Slide } from 'src/components/Slider';
import YouTube from 'react-youtube';
import GalleryItem from 'src/components/Gallery/GalleryItem';

function Infor() {
    return (
        <div className="info-wrapper">
            <div
                style={{
                    backgroundImage: `url('https://images7.alphacoders.com/100/thumb-1920-1003272.jpg')`,
                }}
                className="info-background"
            ></div>

            <div className="info-container">
                <div className="row">
                    {/* Poster */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-2">
                        <div className="info-poster-wrapper">
                            <div className="info-poster">
                                <img
                                    src="https://znews-photo.zingcdn.me/w660/Uploaded/ofh_wuytgazs/2019_06_09/MV5BOGFjYWNkMTMtMTg1ZC00Y2I4LTg0ZTYtN2ZlMzI4MGQwNzg4XkEyXkFqcGdeQXVyMTkxNjUyNQ_V1_.jpg"
                                    alt="Poster"
                                />
                            </div>
                            <div className="info-button">
                                <Button
                                    href="#trailer"
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
                                            textSize: '3rem',
                                        })}
                                        value={(8.6 / 10) * 100}
                                        maxValue={100}
                                        text={`8.6`}
                                    />
                                </div>
                                <div className="info-rating-detail">
                                    <p>
                                        <span>18000</span> ratings
                                    </p>
                                    <p>
                                        <span>84</span> reviews
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                        <div className="info-content">
                            <h2 className="info-name">Godzilla</h2>
                            <p className="info-original-title">
                                Original title: Godzilla king of the monster
                            </p>
                            <ul className="info-genres">
                                <Button type="rounded" size="small">
                                    Action
                                </Button>
                                <Button type="rounded" size="small">
                                    Adventure
                                </Button>
                            </ul>
                            <ul className="info-detail">
                                <li className="info-detail-item">
                                    <BsCircle className="info-detail-icon" />
                                    <span>Status: Playing</span>
                                </li>
                                <li className="info-detail-item">
                                    <BsCalendar4Week className="info-detail-icon" />
                                    <span>Release date: 22-12-2018</span>
                                </li>
                                <li className="info-detail-item">
                                    <TbTimeline className="info-detail-icon" />
                                    <span>Runtime: 180 min</span>
                                </li>
                            </ul>

                            {/* story */}
                            <div className="info-overview">
                                <h2 className="info-overview-heading">
                                    <VscBook className="info-overview-icon" /> overview:
                                </h2>
                                <p>
                                    It is a long established fact that a reader will be distracted
                                    by the readable content of a page when looking at its layout.
                                    The point of using Lorem Ipsum is that it has a more-or-less
                                    normal distribution of letters, as opposed to using 'Content
                                    here, content here', making it look like readable English. Many
                                    desktop publishing packages and web page editors now use Lorem
                                    Ipsum as their default model text, and a search for 'lorem
                                    ipsum' will uncover many web sites still in their infancy.
                                    Various versions have evolved over the years, sometimes by
                                    accident, sometimes on purpose (injected humour and the like).
                                </p>
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
                                    {[1, 2, 3, 4, 5, 6, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                                        (item, index) => (
                                            <Slide key={index}>
                                                <div className="info-cast-item">
                                                    <div className="info-cast-avatar">
                                                        <img
                                                            src="https://vcdn1-giaitri.vnecdn.net/2020/09/22/Minami-Hamabe-1600749592.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wQOxwd2UTHWHNeWoFv79Xg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h3 className="info-cast-name">
                                                        Vinh Huynh {index}
                                                    </h3>
                                                </div>
                                            </Slide>
                                        ),
                                    )}
                                </Slider>
                            </div>
                        </div>
                    </div>

                    {/* Trailer */}
                    <div id="trailer" className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="info-section">
                            <GalleryHeader heading="Trailer" />
                            <div className="info-player">
                                <YouTube />
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
                                    {[1, 2, 3, 4, 5, 6, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                                        (item, index) => (
                                            <Slide key={index}>
                                                <div className="info-similar-item">
                                                    <GalleryItem mediaType="movie" />
                                                </div>
                                            </Slide>
                                        ),
                                    )}
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
