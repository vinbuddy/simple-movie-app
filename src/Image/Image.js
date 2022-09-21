import images from 'src/assets/images';
function Image({ src, ...props }) {
    // If URL include '/null' => src = undefined
    if (src.includes('/null')) {
        src = undefined;
    }

    return <img src={src || images.fallback} {...props} />;
}

export default Image;
