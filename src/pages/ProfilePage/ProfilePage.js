import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/context/UserContext';
import './ProfilePage.scss';

import { MdOutlineShortText, MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { AiOutlineMail, AiOutlineUser, AiOutlineFieldTime, AiOutlineEdit } from 'react-icons/ai';

import images from 'src/assets/images';
import { Image } from 'src/components/Image';
import { SaveContext } from 'src/context/SaveContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, storage } from 'src/firebase/firebase';
import GalleryItem from 'src/components/Gallery/GalleryItem';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/Button';
import { Modal } from 'src/components/Modal';
import { ModalContext } from 'src/context/ModalContext';
import { AuthContext } from 'src/context/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

function ProfilePage() {
    const currentUser = useContext(UserContext);
    const { handleUpdateProfile } = useContext(AuthContext);
    const { setLoading } = useContext(SaveContext);
    const { showModal, modalName, handleShowModal, handleHideModal } = useContext(ModalContext);

    const [films, setFilms] = useState([]);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [name, setName] = useState(currentUser?.displayName);
    const [editLoading, setEditLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getFilms = async () => {
            setLoading(true);
            try {
                const ref = collection(db, 'films_saved', currentUser.uid, 'all_films');
                const q = query(ref, orderBy('createAt', 'desc'));

                onSnapshot(q, (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                    setFilms(data);
                    setLoading(false);
                });
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getFilms();
    }, [currentUser]);

    useEffect(() => {
        document.title = 'Profile | Simple Movie App';
    }, []);

    useEffect(() => {
        return () => {
            previewAvatar && URL.revokeObjectURL(previewAvatar.url);
        };
    }, [previewAvatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.url = URL.createObjectURL(file);

        setPreviewAvatar(file);
    };

    const handleHideEditProfileModal = () => {
        // Reset
        setName(currentUser.displayName);
        setPreviewAvatar(null);

        handleHideModal();
    };

    const submitEditProfile = async () => {
        setEditLoading(true);

        if (previewAvatar) {
            const avatarRef = ref(
                storage,
                `images/${currentUser.uid}/avatar/${Date.now()}${previewAvatar.name}`,
            );
            await uploadBytes(avatarRef, previewAvatar);
            const avatarURL = await getDownloadURL(avatarRef);

            await handleUpdateProfile(name, avatarURL);
        } else {
            await handleUpdateProfile(name);
        }

        handleHideModal();
        setEditLoading(false);
        navigate(0);
    };

    return (
        <div className="profile-wrapper">
            <Modal
                size="small"
                onHideModal={handleHideEditProfileModal}
                show={showModal && modalName === 'edit-profile'}
                title="Edit profile"
            >
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <Image
                        lazy={false}
                        className="edit-profile-avatar"
                        src={previewAvatar?.url || currentUser.photoURL}
                        fallback={images.avatarPlaceholder}
                        alt="avatar profile"
                    />
                    <label
                        htmlFor="upload"
                        className="edit-profile-upload mt-2 d-flex align-items-center"
                    >
                        <MdOutlineAddPhotoAlternate /> &nbsp; Change avatar
                    </label>
                    <input
                        onChange={handlePreviewAvatar}
                        id="upload"
                        className="d-none"
                        type="file"
                        accept="image/*"
                    />
                </div>

                <div className="edit-profile-info mt-4">
                    <div className="d-flex align-items-center mb-4">
                        <label>Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            type="text"
                        />
                    </div>
                </div>

                <footer className="mt-4 d-flex align-items-center justify-content-end">
                    <Button onClick={handleHideEditProfileModal} type="no-outline">
                        Cancel
                    </Button>
                    <Button
                        disabled={name === currentUser.displayName && !!previewAvatar === false}
                        onClick={submitEditProfile}
                        type="primary"
                    >
                        {editLoading ? <CgSpinnerTwoAlt className="spin" /> : 'Change'}
                    </Button>
                </footer>
            </Modal>

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

            <div className="profile-name-bar">
                <h3 className="profile-name">{currentUser?.displayName}</h3>
                <Button
                    onClick={() => handleShowModal('edit-profile')}
                    size="small"
                    type="secondary"
                    leftIcon={<AiOutlineEdit />}
                >
                    Edit profile
                </Button>
            </div>

            <section className="profile-info">
                <div className="row align-items-start">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-12 col-md-4 mb-2">
                        <div className="row">
                            <div className="col-lg-12 mb-4">
                                <section className="profile-intro">
                                    <h3 className="profile-info-title mb-4">Introduce</h3>
                                    <p className="profile-info-text">
                                        <AiOutlineUser className="profile-info-icon" />
                                        <span> Member of Simple Movie App</span>
                                    </p>
                                    <p className="profile-info-text">
                                        <AiOutlineFieldTime className="profile-info-icon" /> &nbsp;
                                        <span>
                                            Create at &nbsp;
                                            {new Date(
                                                currentUser?.metadata?.creationTime,
                                            ).toLocaleString()}
                                        </span>
                                    </p>
                                </section>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <section className="profile-intro">
                                    <h3 className="profile-info-title mb-4">Account</h3>

                                    <p className="profile-info-text mb-2">
                                        <AiOutlineMail className="profile-info-icon" /> &nbsp;
                                        <span>{currentUser?.email || 'Google authentication'}</span>
                                    </p>
                                    <p className="profile-info-text">
                                        <MdOutlineShortText className="profile-info-icon" /> &nbsp;
                                        <span>{currentUser?.displayName}</span>
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                        <section className="profile-movie-watched">
                            <section className="profile-intro">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h3 className="profile-info-title">Films Saved</h3>
                                    <Link to="/saved">Saved page</Link>
                                </div>

                                <div className="row">
                                    {films.slice(0, 12).map((film) => (
                                        <div
                                            key={film.id}
                                            className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 pb-4 d-block"
                                        >
                                            <GalleryItem mediaType={film.mediaType} data={film} />
                                        </div>
                                    ))}

                                    {films.length <= 0 && <p>No saved</p>}
                                </div>
                            </section>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProfilePage;
