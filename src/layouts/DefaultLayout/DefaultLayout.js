import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import Header from '../LayoutComponents/Header';
import Sidebar from '../LayoutComponents/Sidebar';
import GoTopButton from 'src/components/ScrollToTop/GoTopButton';

import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '../LayoutComponents/Footer';

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
            <Header />
            <div className={cx('wrapper')}>
                <div className="container position-relative">
                    <div className={cx('inner')}>
                        <div className="row">
                            <div className="col-lg-2 d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block">
                                <Sidebar />
                            </div>
                            <div className="col-lg-10 col-md-12 col-sm-12 col-12">
                                <div id="content" className={cx('content')}>
                                    {children}
                                </div>
                            </div>
                        </div>

                        <div className={cx('go-top-btn')}>
                            <GoTopButton onClick={handleGoTop} />
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default DefaultLayout;
