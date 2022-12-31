import classNames from 'classnames/bind';
import styles from './LoadingBar.module.scss';
const cx = classNames.bind(styles);

function LoadingProcess({ top = 0, width = '100%', height = 3 }) {
    return (
        <div style={{ top: top, width: width, height: height }} className={cx('loading-bar')}></div>
    );
}

export default LoadingProcess;
