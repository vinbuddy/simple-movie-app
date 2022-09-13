// Bootstrap
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import images from 'src/assets/images';
const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <Container style={{ height: '100%' }}>
                <div className={cx('inner')}>
                    <img className={cx('logo')} src={images.logo} alt="" />

                    <div className={cx('search')}>
                        <input className={cx('search-input')} type="text" />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Header;
