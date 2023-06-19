import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className="pt-4 pb-4 d-flex align-items-center justify-content-between">
                    <p>© 2023 Copyright: Simple Movie App</p>
                    <ul className={cx('social-list')}>
                        <li className="me-4">
                            <Link to="">
                                <FaFacebookF />
                            </Link>
                        </li>
                        <li className="me-4">
                            <Link to="">
                                <FaInstagram />
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <FaGithub />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
