import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

import { AiOutlineClose } from 'react-icons/ai';

import { ModalContext } from 'src/context/ModalContext';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Modal({ title, children }) {
    const { showModal, setModalName, handleHideModal } = useContext(ModalContext);

    return (
        <div onClick={handleHideModal} className={cx('modal-overlay')}>
            <div onClick={(e) => e.stopPropagation()} className={cx('modal-wrapper')}>
                <header className={cx('modal-header')}>
                    <h2 className={cx('modal-title')}>{title}</h2>
                    <button onClick={handleHideModal} className={cx('modal-close-btn')}>
                        <AiOutlineClose />
                    </button>
                </header>
                <main className={cx('modal-body')}>{children}</main>
            </div>
        </div>
    );
}

export default Modal;
