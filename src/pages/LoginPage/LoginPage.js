import './LoginPage.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import images from 'src/assets/images';
import Button from 'src/components/Button';
import Image from 'src/components/Image';
import LoadingBar from 'src/components/LoadingBar';

import { AiOutlineEye } from 'react-icons/ai';
import { RiEyeCloseLine } from 'react-icons/ri';

import { UserContext } from 'src/context/UserContext';
import { AuthContext } from 'src/context/AuthContext';

function LoginPage() {
    // React hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const { state } = useLocation();
    const navigate = useNavigate();

    const currentUser = useContext(UserContext);
    const {
        authError,
        authLoading,
        handleSignInGoogleEmailPassword,
        handleSignInGoogle,
        handleSignInFacebook,
    } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            state?.prevPath ? navigate(state?.prevPath) : navigate('/');
        }

        document.title = 'Simple Movie App | Login';
    }, [currentUser]);

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

        if (data?.email && data?.password)
            handleSignInGoogleEmailPassword(data.email, data.password);
    };

    const handleFocus = () => {
        setError(false);
    };

    return (
        <div className="form-wrapper">
            {authLoading && <LoadingBar top={0} width="100%" height={5} />}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Link to="/" className="logo">
                    <Image src={images.logo} alt="logo" />
                </Link>
                <h1 className="title">Sign in to Simple Movie App</h1>

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
                    <div className="input-item">
                        <input
                            onFocus={handleFocus}
                            name="password"
                            ref={passwordRef}
                            spellCheck={false}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiOutlineEye /> : <RiEyeCloseLine />}
                        </button>
                        {errors.password?.type === 'required' && (
                            <p className="error-message">Please enter password</p>
                        )}
                    </div>
                </div>

                {error && <p className="error-message">{errorMessage}</p>}

                <div className="submit-btn">
                    <Button type="primary" size="medium">
                        Sign In
                    </Button>
                </div>

                <div className="divider"></div>

                <div className="submit-btn-another">
                    <button onClick={handleSignInGoogle}>
                        <img src={images.google} alt="google" />
                        Google
                    </button>
                    <button onClick={handleSignInFacebook}>
                        <img src={images.facebook} alt="facebook" />
                        Facebook
                    </button>
                </div>
                <p className="navigate-link">
                    <Link className="navigate-link-item" to="/reset">
                        Forgot password
                    </Link>
                </p>
                <p className="navigate-link">
                    Not registered yet?
                    <Link className="navigate-link-item" to="/register">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
