import Tippy from '@tippyjs/react/headless';
import PopperFrame from '../PopperFrame';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ hideClickInner, children, menuItems = [], ...props }) {
    const renderItem = () => {
        return menuItems.map((item, index) => (
            <MenuItem
                hideClickInner={hideClickInner}
                to={item.to}
                key={index}
                onClick={item.onClick}
                data={item}
            />
        ));
    };

    return (
        <Tippy
            delay={[0, 100]}
            interactive
            {...props}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperFrame>
                        <div className={cx('menu-inner')}>{renderItem()}</div>
                    </PopperFrame>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
