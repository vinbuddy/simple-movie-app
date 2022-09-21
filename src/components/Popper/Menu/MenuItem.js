import Button from 'src/components/Button';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ itemData }) {
    return (
        <Button
            onClick={itemData.onClick}
            className={cx('menu-item', { separate: itemData.separate })}
            leftIcon={itemData.icon}
        >
            {itemData.title}
        </Button>
    );
}

export default MenuItem;
