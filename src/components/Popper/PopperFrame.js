import './Popper.module.scss';

import classNames from 'classnames/bind';
import styles from './Popper.module.scss';
const cx = classNames.bind(styles);

function PopperFrame({ children }) {
    return <div className={cx('popper-frame')}>{children}</div>;
}

export default PopperFrame;
