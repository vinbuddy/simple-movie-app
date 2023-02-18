import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './FilmInfor.module.scss';

const cx = classNames.bind(styles);

function GenreInfor({ name }) {
    return (
        <>
            <li className={cx('info-genre-item')}>
                <Button type="rounded" size="small">
                    {name}
                </Button>
            </li>
        </>
    );
}

export default GenreInfor;
