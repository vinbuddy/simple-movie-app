import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import images from 'src/assets/images';
import Button from 'src/components/Button';
import Image from 'src/components/Image';
import { UserContext } from 'src/context/UserContext';

import './RegisterPage.scss';
import { AuthContext } from 'src/context/AuthContext';
import LoadingBar from 'src/components/LoadingBar';

function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const userNameRef = useRef();
    const navigate = useNavigate();

    const userData = useContext(UserContext);
    const { authError, authLoading, handleCreateAccount } = useContext(AuthContext);

    useEffect(() => {
        if (userData) navigate('/', { replace: true }); // go back prev page

        document.title = 'Simple Movie App | Register';
    }, [userData]);

    const switchErrorCode = () => {
        switch (authError) {
            case 'auth/email-already-in-use':
                setErrorMessage('Existing account');
                break;
            case 'auth/invalid-email':
                setErrorMessage('Invalid email');
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

        if (data?.name && data?.email && data?.password)
            handleCreateAccount(data.name, data.email, data.password);
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
                <h1 className="title">Create Your Account</h1>

                <div className="input-wrapper">
                    <div className="input-item">
                        <input
                            ref={userNameRef}
                            onFocus={handleFocus}
                            spellCheck={false}
                            type="text"
                            placeholder="Your user name"
                            name="name"
                            {...register('name', { required: true, maxLength: 30 })}
                        />
                        {errors.name?.type === 'required' && (
                            <p className="error-message">Please enter name</p>
                        )}
                    </div>

                    <div className="input-item">
                        <input
                            onFocus={handleFocus}
                            ref={emailRef}
                            spellCheck={false}
                            type="text"
                            placeholder="Email address"
                            name="email"
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
                            ref={passwordRef}
                            spellCheck={false}
                            type="password"
                            placeholder="Password"
                            name="password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                maxLength: 15,
                            })}
                        />
                        {errors.password?.type === 'required' && (
                            <p className="error-message">Please enter password</p>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <p className="error-message">Please enter at least 6 characters</p>
                        )}
                        {errors.password?.type === 'maxLength' && (
                            <p className="error-message">Please enter up to 15 characters</p>
                        )}
                    </div>

                    <div className="input-item">
                        <input
                            type="text"
                            placeholder="Confirm password"
                            name="confirm"
                            {...register('confirm', {
                                require: true,
                                validate: (value) => {
                                    if (watch('password') !== value || watch('password') === '')
                                        return 'Your password do not match';
                                },
                            })}
                        />
                        {errors.confirm?.type === 'validate' && (
                            <p className="error-message">{errors.confirm?.message}</p>
                        )}
                        {errors.confirm?.type === 'required' && (
                            <p className="error-message">Please enter confirm password</p>
                        )}
                    </div>
                </div>

                {error && <p className="error-message">{errorMessage}</p>}

                <div className="submit-btn">
                    <Button type="primary" size="medium">
                        Create my account
                    </Button>
                </div>

                <p className="navigate-link">
                    Already have an account?
                    <Link className="navigate-link-item" to="/login">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;
