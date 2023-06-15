import Button from 'src/components/Button';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data = {}, payload = {}, to, onClick = () => {}, hideClickInner = () => {} }) {
    return (
        <Button
            onClick={() => {
                hideClickInner();
                onClick(payload);
            }}
            className={cx('menu-item', { separate: data.separate })}
            leftIcon={data.icon}
            to={to}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;
