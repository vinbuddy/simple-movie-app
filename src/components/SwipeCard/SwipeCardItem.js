import classNames from 'classnames/bind';
import styles from './SwipeCard.module.scss';

import { AiFillFire } from 'react-icons/ai';
import Image from '../Image';

const cx = classNames.bind(styles);

function SwipeCardItem({ data, pageNumber, totalPage }) {
    return (
        <div className={cx('card-item-wrapper')}>
            <div className="d-flex flex-column justify-content-between h-100">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={data?.url}
                    className={cx('card-item-info')}
                >
                    <div className={cx('card-item-thumb')}>
                        <Image src={data?.multimedia[0].url} alt="News image" />
                    </div>

                    <p className={cx('card-item-heading')}>
                        <span>
                            <AiFillFire />
                        </span>
                        Hot news
                    </p>

                    <p className={cx('card-item-desc')}>{data?.abstract || 'No Description'}</p>
                </a>
                <div className="d-flex justify-content-between align-items-center">
                    <p className={cx('card-item-section')}>{data?.section}</p>
                    <span className={cx('card-item-page')}>
                        {pageNumber}/{totalPage}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SwipeCardItem;
