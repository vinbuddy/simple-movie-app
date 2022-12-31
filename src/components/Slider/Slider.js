import { Swiper } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import './Slider.scss';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Autoplay, Navigation, Pagination]);

function Slider({ children, autoplay = false, slidesPerView = 1, ...props }) {
    return (
        <Swiper
            autoplay={autoplay}
            speed={600}
            direction="horizontal"
            slidesPerView={slidesPerView}
            {...props}
        >
            {children}
        </Swiper>
    );
}

export default Slider;
