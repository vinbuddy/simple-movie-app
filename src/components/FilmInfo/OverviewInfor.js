import classNames from 'classnames/bind';
import styles from './FilmInfor.module.scss';

const cx = classNames.bind(styles);

function OverviewInfo({ children }) {
    return (
        <div className={cx('info-overview')}>
            <p className={cx('info-overview-content')}>{children}</p>
        </div>
    );
}

export default OverviewInfo;
