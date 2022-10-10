import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import MobileAction from 'src/components/MobileAction';
import NavigateItem from 'src/components/NavigateItem/';
import config from 'src/config';

import { CgScreenMirror } from 'react-icons/cg';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineWidgets, MdAirplay } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { RiMovie2Line } from 'react-icons/ri';
import { BsBookmark } from 'react-icons/bs';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('sidebar-wrapper')}>
            <nav>
                <NavigateItem to={config.routes.home} leftIcon={<MdOutlineWidgets />}>
                    Home
                </NavigateItem>

                <NavigateItem to={config.routes.movie} leftIcon={<RiMovie2Line />}>
                    Movie
                </NavigateItem>

                <NavigateItem to={config.routes.tv} leftIcon={<MdAirplay />}>
                    TV Show
                </NavigateItem>

                <NavigateItem to={config.routes.search} leftIcon={<BiSearch />}>
                    Search
                </NavigateItem>
            </nav>

            <nav className={cx('personal')}>
                <NavigateItem to={config.routes.saved} leftIcon={<BsBookmark />}>
                    Saved
                </NavigateItem>

                <NavigateItem to={config.routes.profile} leftIcon={<AiOutlineUser />}>
                    Profile
                </NavigateItem>
            </nav>

            {/* display on mobile */}
            <MobileAction />
        </aside>
    );
}

export default Sidebar;
