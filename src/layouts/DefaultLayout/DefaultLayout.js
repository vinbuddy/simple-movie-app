import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '../Header';
import Sidebar from '../Sidebar';

const cx = classNames.bind(styles);

// children = Page
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
