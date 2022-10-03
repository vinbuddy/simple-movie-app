import classNames from 'classnames/bind';
import styles from './SwiperCardItem.module.scss';

import { getMonthYear } from 'src/utils/handleDate';

import { AiFillFire } from 'react-icons/ai';

const cx = classNames.bind(styles);

function SwipeCardItem({ data, pageNumber }) {
    const publishedDate = getMonthYear(data.publishedAt);
    return (
        <div className={cx('card-item-wrapper')}>
            <div className="d-flex flex-column justify-content-between h-100">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={data.url}
                    className={cx('card-item-info')}
                >
                    <div style={{ width: '100%', height: '175px' }}>
                        <img className={cx('card-item-thumb')} src={data.urlToImage} alt="" />
                    </div>

                    <p className={cx('card-item-heading')}>
                        <span>
                            <AiFillFire />
                        </span>
                        Hot news
                    </p>

                    <p className={cx('card-item-desc')}>{data.description}</p>
                </a>
                <div className="d-flex justify-content-between align-items-center">
                    <p className={cx('card-item-published')}>{publishedDate}</p>
                    <spam>{pageNumber}/10</spam>
                </div>
            </div>
        </div>
    );
}

export default SwipeCardItem;
