import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '../Header';
import Sidebar from '../Sidebar';
import { Container } from 'react-bootstrap';

const cx = classNames.bind(styles);

// children = Page
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrapper')}>
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <Sidebar />
                        </div>
                        <div className="col-10">
                            <div className={cx('content')}>{children}</div>
                        </div>
                    </div>
                </div>
            </div>
            <footer style={{ height: 300, background: '#000' }}></footer>
        </div>
    );
}

export default DefaultLayout;
