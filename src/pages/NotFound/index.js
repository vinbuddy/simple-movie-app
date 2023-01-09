import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';

import videoBackground from 'src/assets/videos/notFoundBackground.mp4';

import images from 'src/assets/images';
import Button from 'src/components/Button';
const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx('error-page')}>
            <video className={cx('error-background')} src={videoBackground} autoPlay muted loop />
            <div className={cx('error-content')}>
                <img src={images.starWarHead} alt="Error Img" />
                <h1 className={cx('error-heading')}>404 ERROR</h1>
                <p className={cx('error-desc')}>Ohh! This is not the place you're looking for 🤖</p>
                <div className={cx('d-flex justify-content-center')}>
                    <Button to="/" size="large" type="primary">
                        GO HOME
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
