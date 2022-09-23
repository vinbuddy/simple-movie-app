import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';

import images from 'src/assets/images';
import Button from 'src/components/Button';
const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx('error-page')}>
            <img className={cx('error-img')} src={images.notFound} alt="" />
            <h1 className={cx('error-heading')}>404 ERROR</h1>
            <p className={cx('error-desc')}>
                Ohh! Something went wrong, go back to enjoy watching films
            </p>
            <Button to="/" size="large" type="primary">
                GO BACK
            </Button>
        </div>
    );
}

export default NotFound;
