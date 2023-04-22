import classNames from 'classnames/bind';
import styles from './FilmLayout.module.scss';

import TippyToolTips from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import Header from '../LayoutComponents/Header';
import Sidebar from '../LayoutComponents/Sidebar';
import GoTopButton from 'src/components/ScrollToTop/GoTopButton';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

// children = Page
function DefaultLayout({ children }) {
    const handleGoTop = () => {
        let scrolledY = window.scrollY;

        if (scrolledY) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Header containerType="container-fluid" />
            <div className={cx('wrapper', 'container-fluid')}>
                <div className="row ">
                    {/* g-0 -> no gutter */}
                    <div className="col-lg-1 d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block g-0">
                        <Sidebar sidebarType="mini" />
                    </div>
                    <div className="col-lg-11 col-md-12 col-sm-12 col-12 g-0">
                        <div id="content" className={cx('content')}>
                            {children}
                        </div>
                    </div>
                </div>

                <div className={cx('go-top-btn')}>
                    <GoTopButton onClick={handleGoTop} />
                </div>
                {/* <div className={cx('inner')}>
                </div> */}
            </div>
            {/* <footer style={{ height: 300, background: '#000' }}></footer> */}
        </div>
    );
}

export default DefaultLayout;
