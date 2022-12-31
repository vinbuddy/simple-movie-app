import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

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

import { UserContext } from 'src/context/UserContext';
import { UserInfo } from 'src/components/UserInfo';

const cx = classNames.bind(styles);

function Header({ containerType = 'container' }) {
    const userDataContext = useContext(UserContext);
    const location = useLocation();

    return (
        <div className={cx('header')}>
            <div className={containerType} style={{ height: '100%' }}>
                <div className={cx('inner')}>
                    <Link className={cx('logo-wrapper')} to="/">
                        <img className={cx('logo')} src={images.logo} alt="" />
                        <h2>Simple Not Trivial</h2>
                    </Link>

                    <Search />

                    {/* type: primary, normal, outline, rounded */}
                    {/* size: smmall, medium (default), large */}

                    <div className={cx('actions')}>
                        {/* if user login -> display avatar */}
                        {!!userDataContext ? (
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

                                <div className={cx('separate')}></div>

                                <Menu>
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
                                        state={{ prevPath: location.pathname }}
                                        type="primary"
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
