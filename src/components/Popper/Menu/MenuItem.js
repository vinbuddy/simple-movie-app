import Button from 'src/components/Button';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ to, data }) {
    return (
        <Button
            onClick={data.onClick}
            className={cx('menu-item', { separate: data.separate })}
            leftIcon={data.icon}
            to={to}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;
