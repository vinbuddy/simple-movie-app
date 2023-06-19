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
                    <p>© Simple Movie App</p>
                    <ul className={cx('social-list')}>
                        <li className="me-4">
                            <a target="_blank" href="https://www.facebook.com/iamvinhhuynh">
                                <FaFacebookF />
                            </a>
                        </li>
                        <li className="me-4">
                            <a target="_blank" href="https://www.instagram.com/vermon.js/">
                                <FaInstagram />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://github.com/vinbuddy">
                                <FaGithub />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
