import { Link } from 'react-router-dom';
import { handleSignIn } from 'src/firebase/useFirebase';
import { useContext } from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import images from 'src/assets/images';

// comps
import ToggleTheme from 'src/components/ToggleTheme';
import Button from 'src/components/Button';
import Search from 'src/layouts/Search';

import { Menu } from 'src/components/Popper';

import { UserContext } from 'src/context/UserContext';
import UserInfo from 'src/components/UserInfo';

const cx = classNames.bind(styles);

function Header() {
    const userDataContext = useContext(UserContext);

    return (
        <div className={cx('header')}>
            <Container style={{ height: '100%' }}>
                <div className={cx('inner')}>
                    <Link to="/">
                        <img className={cx('logo')} src={images.logo} alt="" />
                    </Link>

                    <Search />

                    {/* type: primary, normal, outline, rounded */}
                    {/* size: smmall, medium (default), large */}

                    <div className={cx('actions')}>
                        {/* if user login -> display avatar */}
                        {!!userDataContext ? (
                            <>
                                <ToggleTheme />

                                <div className={cx('separate')}></div>

                                <Menu>
                                    <UserInfo />
                                </Menu>
                            </>
                        ) : (
                            <>
                                <ToggleTheme />

                                <div style={{ marginLeft: 24 }}>
                                    <Button onClick={handleSignIn} type="primary">
                                        Sign in
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Header;
