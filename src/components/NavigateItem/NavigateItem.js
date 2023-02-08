import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NavigateItem.module.scss';

const cx = classNames.bind(styles);

function NavigateItem({ to, leftIcon, children, ...props }) {
    const activeNav = ({ isActive }) => ({
        color: isActive ? 'var(--text-color)' : 'var(--text-nav)',
        background: isActive ? 'var(--nav-background)' : 'transparent',
    });

    return (
        <NavLink className={cx('nav-item')} to={to} style={activeNav} {...props}>
            {leftIcon && <span className={cx('nav-icon')}>{leftIcon}</span>}
            {children && <span className={cx('nav-title')}>{children}</span>}
        </NavLink>
    );
}

export default NavigateItem;
