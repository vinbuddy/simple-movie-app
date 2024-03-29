import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';

import TippyToolTips from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import images from 'src/assets/images';

// comps
import ToggleTheme from 'src/components/ToggleTheme';
import Button from 'src/components/Button';
import Search from 'src/layouts/LayoutComponents/Search';

import { Menu } from 'src/components/Popper';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

import { UserContext } from 'src/context/UserContext';
import { UserInfo } from 'src/components/UserInfo';

import { AiOutlineMenu, AiOutlineCloseCircle } from 'react-icons/ai';
import MobileSidebar from '../Sidebar/MobileSidebar';
import config from 'src/config';
import { AuthContext } from 'src/context/AuthContext';

const cx = classNames.bind(styles);

function Header({ containerType = 'container', isNav = false }) {
    const currentUser = useContext(UserContext);
    const location = useLocation();
    const [searchActive, setSearchActive] = useState(false);

    const [showSidebar, setShowSidebar] = useState(false);
    const { handleSignOut } = useContext(AuthContext);

    const menuItems = [
        {
            title: 'Profile',
            icon: <AiOutlineUser />,
            to: config.routes.profile,
        },
        {
            title: 'Saved',
            icon: <BsBookmark />,
            to: config.routes.saved,
        },
        {
            title: 'Log out',
            icon: <FiLogOut />,
            separate: true,
            onClick: handleSignOut,
        },
    ];

    const handleShowSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleHideSidebar = () => {
        setShowSidebar(false);
    };

    return (
        <div id="header" className={cx('header')}>
            <div className={containerType} style={{ height: '100%' }}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <Link
                            className={cx('logo-wrapper', {
                                'search-active': searchActive,
                            })}
                            to="/"
                        >
                            <img className={cx('logo')} src={images.logo} alt="" />
                            {!isNav && <h2 className={cx('qoute')}>Simple Not Trivial</h2>}
                        </Link>

                        {isNav && (
                            <ul className={cx('nav-list')}>
                                <li className={cx('nav-item')}>
                                    <Link to={config.routes.movies}>Movie</Link>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link to={config.routes.tvs}>TV</Link>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link to={config.routes.search}>Search</Link>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link to={config.routes.saved}>Saved</Link>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link to={config.routes.profile}>Profile</Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    <div
                        className={cx('search-wrapper', {
                            'search-active': searchActive,
                        })}
                    >
                        <Search />
                    </div>

                    <div className={cx('actions')}>
                        {/* if user login -> display avatar */}
                        {!!currentUser ? (
                            <>
                                <TippyToolTips
                                    animation="scale"
                                    delay={[500, 0]}
                                    content="Dark / Light"
                                >
                                    <label className={cx('toggle-theme-btn')}>
                                        <ToggleTheme />
                                    </label>
                                </TippyToolTips>

                                <div className={cx('separate')}></div>

                                <Menu hideOnClick={false} menuItems={menuItems}>
                                    <UserInfo />
                                </Menu>
                            </>
                        ) : (
                            <>
                                <TippyToolTips
                                    animation="scale"
                                    delay={[500, 0]}
                                    content="Dark / Light"
                                >
                                    <label style={{ lineHeight: 0 }}>
                                        <ToggleTheme />
                                    </label>
                                </TippyToolTips>

                                <div style={{ marginLeft: 24 }}>
                                    <Button
                                        to="/login"
                                        state={{ prevPath: location.pathname + location?.search }}
                                        type="primary"
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className={cx('mobile-actions')}>
                        {searchActive ? (
                            <button
                                onClick={() => setSearchActive(false)}
                                className={cx('cancel-btn')}
                            >
                                Cancel
                            </button>
                        ) : (
                            <div
                                onClick={() => setSearchActive(true)}
                                className={cx('search-wrapper')}
                            >
                                <FiSearch />
                            </div>
                        )}

                        <div>
                            <button className={cx('menu-mobile-btn')} onClick={handleShowSidebar}>
                                <AiOutlineMenu />
                            </button>
                            {/* Menu-sidebar */}
                            <div
                                className={cx('menu-sidebar', {
                                    'show-sidebar': showSidebar,
                                })}
                            >
                                <header className={cx('menu-sidebar-header')}>
                                    <button
                                        className={cx('menu-sidebar-close')}
                                        onClick={handleHideSidebar}
                                    >
                                        <AiOutlineCloseCircle />
                                    </button>
                                    <h2 className={cx('qoute')}>Simple Not Trivial</h2>
                                </header>
                                <MobileSidebar hideSidebar={handleHideSidebar} />
                            </div>

                            <div
                                className={cx('overlay', {
                                    'show-overlay': showSidebar,
                                })}
                                onClick={handleHideSidebar}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
