import classNames from 'classnames/bind';
import styles from './SwipeCard.module.scss';

const cx = classNames.bind(styles);

function SwipeCard({ children }) {
    return (
        <div className={cx('swipe-card-wrapper')}>
            <div className={cx('swipe-card-background')}>{children}</div>
        </div>
    );
}

export default SwipeCard;
