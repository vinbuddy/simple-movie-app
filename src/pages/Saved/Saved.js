import './Saved.scss';
import GalleryHeader from 'src/components/Gallery/GalleryHeader';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

function Saved() {
    return (
        <div>
            <div className="save-header">
                <GalleryHeader heading="Films saved" />

                <button className="save-collection-btn">
                    <AiOutlinePlus />
                    <span>Create new collection</span>
                </button>
            </div>

            <div className="collections">
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <Link to="/">
                            <div className="collection-item">
                                <div className="collection-preview all-films">
                                    <img
                                        className="collection-img"
                                        src="https://image.tmdb.org/t/p/original//gWrZNGfGz68mBrVPn47cBMXPej3.jpg"
                                        alt=""
                                    />

                                    <img
                                        className="collection-img"
                                        src="https://image.tmdb.org/t/p/original//qVdrYN8qu7xUtsdEFeGiIVIaYd.jpg"
                                        alt=""
                                    />

                                    <img
                                        className="collection-img"
                                        src="https://image.tmdb.org/t/p/original//rzRb63TldOKdKydCvWJM8B6EkPM.jpg"
                                        alt=""
                                    />
                                    <img
                                        className="collection-img"
                                        src="https://image.tmdb.org/t/p/original//vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
                                        alt=""
                                    />

                                    <div className="collection-preview-overlay"></div>
                                </div>
                                <div className="collection-info">
                                    <h3 className="collection-name">All films</h3>
                                    <span className="collection-quantity">10 films</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <Link to="/">
                            <div className="collection-item">
                                <div className="collection-preview">
                                    <img
                                        className="collection-img"
                                        src="https://image.tmdb.org/t/p/original//gWrZNGfGz68mBrVPn47cBMXPej3.jpg"
                                        alt=""
                                    />
                                    <div className="collection-preview-overlay"></div>
                                </div>
                                <div className="collection-info">
                                    <h3 className="collection-name">Anime</h3>
                                    <span className="collection-quantity">4 films</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <Link to="/">
                            <div className="collection-item">
                                <div className="collection-preview">
                                    <img
                                        className="collection-img"
                                        src="https://image.tmdb.org/t/p/original//sv1xJUazXeYqALzczSZ3O6nkH75.jpg"
                                        alt=""
                                    />
                                    <div className="collection-preview-overlay"></div>
                                </div>
                                <div className="collection-info">
                                    <h3 className="collection-name">Action</h3>
                                    <span className="collection-quantity">6 films</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Saved;
