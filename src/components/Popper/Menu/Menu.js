import Tippy from '@tippyjs/react/headless';
import PopperFrame from '../PopperFrame';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import MenuItem from './MenuItem';

// Icons
import { AiOutlineUser } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';

import { handleSignOut } from 'src/firebase/useFirebase';

const cx = classNames.bind(styles);

const menuItems = [
    {
        title: 'Profile',
        icon: <AiOutlineUser />,
    },
    {
        title: 'Bookmark',
        icon: <BsBookmark />,
    },
    {
        title: 'Log out',
        icon: <IoIosLogOut />,
        separate: true,
        onClick: handleSignOut,
    },
];

function Menu({ children }) {
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
