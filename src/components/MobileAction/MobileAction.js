import { useContext } from 'react';

import classNames from 'classnames/bind';
import styles from './MobileAction.module.scss';

import { handleSignIn, handleSignOut } from 'src/firebase/useFirebase';
import { ThemeContext } from 'src/context/ThemeContext';
import { UserContext } from 'src/context/UserContext';

import ToggleTheme from 'src/components/ToggleTheme';
import { FiMoon, FiSun, FiLogIn, FiLogOut } from 'react-icons/fi';
import UserInfo from '../UserInfo';

const cx = classNames.bind(styles);

function MobileAction() {
    const ThemeContextData = useContext(ThemeContext);
    const userDataContext = useContext(UserContext);

    return (
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
                <li className={cx('action-item')} onClick={handleSignIn}>
                    <span className={cx('action-icon')}>
                        <FiLogIn />
                    </span>
                    Sign in
                </li>
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
    );
}

export default MobileAction;
