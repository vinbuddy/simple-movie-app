import { useContext } from 'react';
import images from 'src/assets/images';
import { UserContext } from 'src/context/UserContext';
import './ProfilePage.scss';

import { FaRegAddressCard } from 'react-icons/fa';

function ProfilePage() {
    const currentUser = useContext(UserContext);
    console.log('currentUser: ', currentUser);

    return (
        <div className="profile-wrapper">
            <div className="profile-banner">
                <img
                    className="profile-avatar"
                    src="https://dragonball.guru/wp-content/uploads/2021/07/How-Old-Is-Future-Trunks.jpg"
                    alt="avatar profile"
                />
            </div>
            <div className="profile-info">
                <h3 className="profile-name">{currentUser?.displayName}</h3>
                {/* <p className="profile-email">
                        <span>
                            <FaRegAddressCard />
                        </span>
                        {currentUser?.email || ' Huynhthevinh.work@gmail.com'}
                    </p>
                    <p className="profile-position">Simple Movie App admin</p> */}
            </div>
        </div>
    );
}

export default ProfilePage;
