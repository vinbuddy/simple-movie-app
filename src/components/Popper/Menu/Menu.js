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

const cx = classNames.bind(styles);

function Menu({ children }) {
    const { handleSignOut } = useContext(AuthContext);

    const menuItems = [
        {
            title: 'Profile',
            icon: <AiOutlineUser />,
        },
        {
            title: 'Saved',
            icon: <BsBookmark />,
        },
        {
            title: 'Log out',
            icon: <FiLogOut />,
            separate: true,
            onClick: handleSignOut,
        },
    ];

    const renderItem = () => {
        return menuItems.map((item, index) => <MenuItem key={index} itemData={item} />);
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
