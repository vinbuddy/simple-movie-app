import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import './ProfilePage.scss';

import { BsPeopleFill } from 'react-icons/bs';
import { PopperFrame } from 'src/components/Popper';
import images from 'src/assets/images';
import { Image } from 'src/components/Image';

function ProfilePage() {
    const currentUser = useContext(UserContext);
    return (
        <div className="profile-wrapper">
            <div
                style={{ backgroundImage: `url(${images.profileBackground})` }}
                className="profile-banner"
            >
                <Image
                    lazy={false}
                    className="profile-avatar"
                    src={currentUser.photoURL}
                    fallback={images.avatarPlaceholder}
                    alt="avatar profile"
                />
            </div>

            <h3 className="profile-name">{currentUser?.displayName}</h3>

            <section className="profile-info">
                <div className="row">
                    <div className="col-4">
                        <PopperFrame background="var(--profile-info-background)">
                            <section className="profile-intro">
                                <h3 className="profile-info-title">Introduce</h3>
                                <p className="profile-info-text">
                                    <BsPeopleFill /> &nbsp;
                                    <span> Member of Simple Movie App</span>
                                </p>
                            </section>
                        </PopperFrame>
                    </div>
                    <div className="col-8">
                        <section className="profile-movie-watched">
                            <PopperFrame background="var(--profile-info-background)">
                                <section className="profile-intro">
                                    <h3 className="profile-info-title">Movie Watched</h3>
                                    <p>Member of Simple Movie App for 2 years</p>
                                </section>
                            </PopperFrame>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProfilePage;
