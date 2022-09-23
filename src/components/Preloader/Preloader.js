import classNames from 'classnames/bind';
import images from 'src/assets/images';
import styles from './Preloader.module.scss';
const cx = classNames.bind(styles);

function Preloader() {
    return (
        <div className={cx('preloader')}>
            <img className={cx('preloader-logo')} src={images.logo} alt="Preloader logo" />
            <p className={cx('preloader-desc')}>Welcome to Simple Movie App 👋</p>
        </div>
    );
}

export default Preloader;
