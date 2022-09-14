import { Link } from 'react-router-dom';
// Bootstrap
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import images from 'src/assets/images';

// icons
import { FiSearch } from 'react-icons/fi';
import { HiX } from 'react-icons/hi';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <Container style={{ height: '100%' }}>
                <div className={cx('inner')}>
                    <Link to="/">
                        <img className={cx('logo')} src={images.logo} alt="" />
                    </Link>

                    <div className={cx('search')}>
                        <FiSearch className={cx('search-icon')} />
                        <input className={cx('search-input')} placeholder="Search movie..." />
                        <div className={cx('clear')}>
                            <HiX className={cx('clear-icon')} />
                        </div>
                    </div>

                    <label className={cx('theme-btn')} title="dark/light theme" for="toggle">
                        <input type="checkbox" id="toggle" />
                        <span></span>
                    </label>
                </div>
            </Container>
        </div>
    );
}

export default Header;
