import { useContext, forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './UserInfo.module.scss';

import { FiChevronDown } from 'react-icons/fi';
import Image from '../Image';
import { UserContext } from 'src/context/UserContext';
import images from 'src/assets/images';

const cx = classNames.bind(styles);

function UserInfo({ className }, ref) {
    const currentUser = useContext(UserContext);

    return (
        <div className={cx('user-wrapper')} ref={ref}>
            <div className={cx('user-avatar')}>
                <Image
                    fallback={images.avatarPlaceholder}
                    src={currentUser.photoURL}
                    alt="Avatar"
                />
            </div>
            <span className={cx('user-name')}>{currentUser?.displayName}</span>
            <FiChevronDown className={cx('user-icon')} />
        </div>
    );
}

export default forwardRef(UserInfo);
