import { Swiper } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import './Slider.scss';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Autoplay, Navigation]);

function Slider({ children, autoplay = false, ...props }) {
    return (
        <Swiper
            {...props}
            autoplay={autoplay}
            direction="horizontal"
            spaceBetween={0}
            slidesPerView={1}
        >
            {children}
        </Swiper>
    );
}

export default Slider;
