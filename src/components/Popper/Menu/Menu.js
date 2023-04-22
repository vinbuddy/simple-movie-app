import Tippy from '@tippyjs/react/headless';
import PopperFrame from '../PopperFrame';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import MenuItem from './MenuItem';

// Icons
import { AiOutlineUser } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import config from 'src/config';

const cx = classNames.bind(styles);

function Menu({ children }) {
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

    const renderItem = () => {
        return menuItems.map((item, index) => <MenuItem to={item.to} key={index} data={item} />);
    };

    return (
        <Tippy
            hideOnClick={false}
            delay={[0, 300]}
            interactive
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
