import { LazyLoadImage } from 'react-lazy-load-image-component';
import images from 'src/assets/images';

function Image({ src, fallback = images.fallback, ...props }) {
    if (src && src.includes('/null')) {
        src = undefined;
    }

    return (
        <LazyLoadImage
            delayMethod="throttle"
            delayTime={150}
            effect="blur"
            src={src || fallback}
            {...props}
        />
    );
}

export default Image;
