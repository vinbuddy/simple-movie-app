import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './SwipeCard.module.scss';

import { getMonthYear } from 'src/utils/handleDate';

import { AiFillFire } from 'react-icons/ai';
import Image from '../Image';

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
                        <Image
                            className={cx('card-item-thumb')}
                            src={data.urlToImage}
                            alt="News image"
                        />
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
                    <span>{pageNumber}/10</span>
                </div>
            </div>
        </div>
    );
}

export default memo(SwipeCardItem);
