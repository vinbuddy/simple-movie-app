import './ResetPage.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import images from 'src/assets/images';
import Button from 'src/components/Button';
import Image from 'src/components/Image';
import LoadingBar from 'src/components/LoadingBar';

import { UserContext } from 'src/context/UserContext';
import { AuthContext } from 'src/context/AuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPage() {
    // React hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    const emailRef = useRef();

    const { state } = useLocation();
    const navigate = useNavigate();

    const userData = useContext(UserContext);
    const { authError, authLoading, handleResetPassword } = useContext(AuthContext);

    useEffect(() => {
        if (userData) {
            state?.prevPath ? navigate(state?.prevPath) : navigate('/');
        }

        document.title = 'Simple Movie App | Login';
    }, [userData]);

    const switchErrorCode = () => {
        switch (authError) {
            case 'auth/user-not-found':
                setErrorMessage('Invalid account');
                break;
            case 'auth/invalid-email':
                setErrorMessage('Invalid email');
                break;
            case 'auth/wrong-password':
                setErrorMessage('Invalid password');
                break;
            case 'auth/too-many-requests':
                setErrorMessage('Too many request, try later');
                break;
            default:
                setErrorMessage('Error , Try again later');
                break;
        }
    };
    useEffect(() => {
        if (authError.length > 0) {
            setError(true);
            switchErrorCode();
        }
    }, [authError]);

    const onSubmit = (data) => {
        if (authError.length > 0) {
            setError(true);
        }
        if (data?.email) handleResetPassword(data.email);
    };

    const handleFocus = () => {
        setError(false);
    };

    return (
        <div className="form-wrapper">
            {authLoading && <LoadingBar top={0} width="100%" height={5} />}

            {/* Put here to display toast message */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Link to="/" className="logo">
                    <Image src={images.logo} alt="logo" />
                </Link>
                <h1 className="title">Forgot password</h1>

                <ToastContainer hideProgressBar pauseOnHover={false} />

                <div className="input-wrapper">
                    <div className="input-item">
                        <input
                            onFocus={handleFocus}
                            name="email"
                            ref={emailRef}
                            spellCheck={false}
                            type="text"
                            placeholder="Email address"
                            {...register('email', {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />

                        {errors.email?.type === 'required' && (
                            <p className="error-message">Please enter email</p>
                        )}
                        {errors.email?.type === 'pattern' && (
                            <p className="error-message">Please enter invalid email</p>
                        )}
                    </div>
                </div>

                {error && <p className="error-message">{errorMessage}</p>}

                <div className="submit-btn">
                    <Button type="primary" size="medium">
                        Reset password
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ResetPage;
