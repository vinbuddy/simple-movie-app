import { LazyLoadImage } from 'react-lazy-load-image-component';
import images from 'src/assets/images';

function Image({ lazy = true, src, fallback = images.fallback, ...props }) {
    if (src && src.includes('/null')) {
        src = undefined;
    }

    return (
        <>
            {lazy ? (
                <LazyLoadImage
                    delayMethod="throttle"
                    delayTime={150}
                    effect="blur"
                    src={src || fallback}
                    {...props}
                />
            ) : (
                <img src={src || fallback} {...props} />
            )}
        </>
    );
}

export default Image;
