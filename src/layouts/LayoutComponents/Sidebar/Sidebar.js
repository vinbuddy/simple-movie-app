import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

// import MobileAction from 'src/components/MobileAction';
import NavigateItem from 'src/components/NavigateItem/';
import config from 'src/config';

import { useContext } from 'react';
import images from 'src/assets/images';
import { UserContext } from 'src/context/UserContext';

import { BiSearch } from 'react-icons/bi';
import { MdOutlineWidgets, MdAirplay } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { RiMovie2Line } from 'react-icons/ri';
import { BsBookmark } from 'react-icons/bs';

const cx = classNames.bind(styles);

function Sidebar({ sidebarType = 'normal' }) {
    const currentUser = useContext(UserContext);

    // return navigateItem content
    const classifySidebarContent = (content) => {
        switch (sidebarType) {
            case 'mini':
                return null;
            case 'normal':
                return content;
            default:
                break;
        }
    };

    return (
        <aside
            className={cx('sidebar-wrapper', {
                ['sidebar-mini']: sidebarType === 'mini',
            })}
        >
            <nav>
                <NavigateItem to={config.routes.home} leftIcon={<MdOutlineWidgets />}>
                    {classifySidebarContent('Home')}
                </NavigateItem>

                <NavigateItem to={config.routes.movies} leftIcon={<RiMovie2Line />}>
                    {classifySidebarContent('Movie')}
                </NavigateItem>

                <NavigateItem to={config.routes.tvs} leftIcon={<MdAirplay />}>
                    {classifySidebarContent('TV')}
                </NavigateItem>

                <NavigateItem to={config.routes.search} leftIcon={<BiSearch />}>
                    {classifySidebarContent('Search')}
                </NavigateItem>
            </nav>

            <nav
                style={{
                    borderTop:
                        sidebarType === 'normal'
                            ? '1px dotted var(--border-color-top-sidebar)'
                            : 'none',
                }}
                className={cx('personal')}
            >
                <NavigateItem to={config.routes.saved} leftIcon={<BsBookmark />}>
                    {classifySidebarContent('Saved')}
                </NavigateItem>

                <NavigateItem
                    to={config.routes.profile}
                    leftIcon={
                        currentUser ? (
                            <img src={currentUser?.photoURL} alt="avatar" />
                        ) : (
                            <AiOutlineUser />
                        )
                    }
                >
                    {classifySidebarContent('Profile')}
                </NavigateItem>
            </nav>
        </aside>
    );
}

export default Sidebar;
