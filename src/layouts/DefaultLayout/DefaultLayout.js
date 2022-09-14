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
                <Container>
                    <Sidebar />
                    <div className={cx('content')}>{children}</div>
                </Container>
            </div>
        </div>
    );
}

export default DefaultLayout;
