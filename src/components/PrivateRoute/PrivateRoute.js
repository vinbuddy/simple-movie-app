import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { DefaultLayout } from 'src/layouts/DefaultLayout';
import classNames from 'classnames/bind';
import styles from './PrivateRoute.module.scss';
import { Button } from '../Button';
import config from 'src/config';
import images from 'src/assets/images';

const cx = classNames.bind(styles);

function PrivateRoute({ children }) {
    const currentUser = useContext(UserContext);
    return currentUser ? (
        children
    ) : (
        <DefaultLayout>
            <div className={cx('private-wrapper')}>
                <img src={images.glasses} alt="" />
                <Button
                    size="medium"
                    type="outline-basic"
                    to={config.routes.login}
                    className="private-login"
                >
                    Sign in to continue
                </Button>
            </div>
        </DefaultLayout>
    );
}

export default PrivateRoute;
