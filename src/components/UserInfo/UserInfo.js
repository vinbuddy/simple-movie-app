import { useContext, forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './UserInfo.module.scss';

import { FiChevronDown } from 'react-icons/fi';
import { UserContext } from 'src/context/UserContext';

const cx = classNames.bind(styles);

function UserInfo({ className }, ref) {
    const userDataContext = useContext(UserContext);
    return (
        <div className={cx('user-wrapper')} ref={ref}>
            <img className={cx('user-avatar')} src={userDataContext?.photoURL} alt="" />
            <span className={cx('user-name')}>{userDataContext?.displayName}</span>
            <FiChevronDown className={cx('user-icon')} />
        </div>
    );
}

export default forwardRef(UserInfo);
