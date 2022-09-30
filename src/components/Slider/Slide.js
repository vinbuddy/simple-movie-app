import { SwiperSlide } from 'swiper/react';

function Slide({ children }) {
    return <SwiperSlide>{children}</SwiperSlide>;
}

export default Slide;

Slide.displayName = 'SwiperSlide';
