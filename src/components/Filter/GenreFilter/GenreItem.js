import classNames from 'classnames/bind';
import styles from '../Filter.module.scss';
const cx = classNames.bind(styles);

function GenreItem({ genreName, active, ...props }) {
    return (
        <button
            title={genreName}
            className={cx('genre-item', {
                'genre-active': active,
            })}
            {...props}
        >
            {genreName}
        </button>
    );
}

export default GenreItem;
