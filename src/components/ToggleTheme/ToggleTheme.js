import classNames from 'classnames/bind';
import { useContext } from 'react';
import styles from './ToggleTheme.module.scss';

import { ThemeContext } from 'src/context/ThemeContext';

const cx = classNames.bind(styles);

function ToggleTheme() {
    const themeContextData = useContext(ThemeContext);

    return (
        <label className={cx('theme-btn')} title="dark/light theme" htmlFor="toggle">
            <input
                checked={themeContextData.isDark}
                type="checkbox"
                id="toggle"
                onChange={themeContextData.handleToggle}
            />
            <span></span>
        </label>
    );
}

export default ToggleTheme;
