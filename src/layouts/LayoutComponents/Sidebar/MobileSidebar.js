import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

// import MobileAction from 'src/components/MobileAction';
import NavigateItem from 'src/components/NavigateItem/';
import config from 'src/config';

import { BiSearch } from 'react-icons/bi';
import { MdOutlineWidgets, MdAirplay } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { RiMovie2Line } from 'react-icons/ri';
import { BsBookmark } from 'react-icons/bs';

import { ThemeContext } from 'src/context/ThemeContext';
import { UserContext } from 'src/context/UserContext';

import ToggleTheme from 'src/components/ToggleTheme';
import { FiMoon, FiSun, FiLogIn, FiLogOut } from 'react-icons/fi';

import { UserInfo } from 'src/components/UserInfo';
import { AuthContext } from 'src/context/AuthContext';

const cx = classNames.bind(styles);

const navigateItems = [
    {
        to: config.routes.home,
        leftIcon: <MdOutlineWidgets />,
        content: 'Home',
    },
    {
        to: config.routes.movies,
        leftIcon: <RiMovie2Line />,
        content: 'Movie',
    },
    {
        to: config.routes.tvs,
        leftIcon: <MdAirplay />,
        content: 'TV',
    },
    {
        to: config.routes.search,
        leftIcon: <BiSearch />,
        content: 'Search',
    },
];

const navigatePersonals = [
    {
        to: config.routes.saved,
        leftIcon: <BsBookmark />,
        content: 'Saved',
    },
    {
        to: config.routes.profile,
        leftIcon: <AiOutlineUser />,
        content: 'Profile',
    },
];

function MobileSidebar({ hideSidebar }) {
    const ThemeContextData = useContext(ThemeContext);
    const userDataContext = useContext(UserContext);
    const { handleSignOut } = useContext(AuthContext);

    const location = useLocation();

    return (
        <aside>
            <nav>
                {navigateItems.map((item, index) => (
                    <NavigateItem
                        onClick={hideSidebar}
                        key={index}
                        to={item.to}
                        leftIcon={item.leftIcon}
                    >
                        {item.content}
                    </NavigateItem>
                ))}
            </nav>

            <nav className={cx('personal')}>
                {navigatePersonals.map((item, index) => (
                    <NavigateItem
                        onClick={hideSidebar}
                        key={index}
                        to={item.to}
                        leftIcon={item.leftIcon}
                    >
                        {item.content}
                    </NavigateItem>
                ))}
            </nav>

            <ul className={cx('action-list')}>
                {!!userDataContext && (
                    <li className={cx('action-item')}>
                        <UserInfo />
                    </li>
                )}

                {!!userDataContext ? (
                    <li className={cx('action-item')} onClick={handleSignOut}>
                        <span className={cx('action-icon')}>
                            <FiLogOut />
                        </span>
                        Sign out
                    </li>
                ) : (
                    <Link
                        to="/login"
                        state={{ prevPath: location.pathname + location?.search }}
                        className={cx('action-item')}
                    >
                        <span className={cx('action-icon')}>
                            <FiLogIn />
                        </span>
                        Sign in
                    </Link>
                )}

                {/* Theme */}
                <li className={cx('action-item', 'theme')}>
                    <span className={cx('action-icon')}>
                        {ThemeContextData.isDark ? <FiMoon /> : <FiSun />}
                    </span>
                    Theme
                    <ToggleTheme />
                </li>
            </ul>
        </aside>
    );
}

export default MobileSidebar;
