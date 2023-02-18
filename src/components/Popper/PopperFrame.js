import './Popper.module.scss';

import classNames from 'classnames/bind';
import styles from './Popper.module.scss';
const cx = classNames.bind(styles);

function PopperFrame({ children, background = '#fff' }) {
    return (
        <div style={{ backgroundColor: background }} className={cx('popper-frame')}>
            {children}
        </div>
    );
}

export default PopperFrame;
