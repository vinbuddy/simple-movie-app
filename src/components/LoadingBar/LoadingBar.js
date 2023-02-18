import classNames from 'classnames/bind';
import styles from './LoadingBar.module.scss';
const cx = classNames.bind(styles);

function LoadingProcess({ top = 0, width = '100%', height = 3, className }) {
    return (
        <div
            style={{ top: top, width: width, height: height }}
            className={cx('loading-bar', {
                [className]: className,
            })}
        ></div>
    );
}

export default LoadingProcess;
