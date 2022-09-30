import { Swiper } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import './Slider.scss';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Autoplay, Navigation]);

function Slider({ children }) {
    return (
        <Swiper
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            direction="horizontal"
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            loop={true}
        >
            {children}
        </Swiper>
    );
}

export default Slider;
