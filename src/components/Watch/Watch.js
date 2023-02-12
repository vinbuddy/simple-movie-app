import { PopperFrame } from '../Popper';
import './Watch.scss';

function Watch({ mediaType = 'movie', id }) {
    return (
        <>
            <div className="row">
                {/* Watch  */}
                <div className="col-lg-9">
                    <div className="watch">
                        <div className="watch-wrapper">
                            <iframe
                                allowFullScreen={true}
                                title="watch embed"
                                className="watch-embed"
                                src={`https://2embed.org/embed/${mediaType}?tmdb=299536`}
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Suggest film */}
                <div className="col-lg-3">
                    <div className="suggest-bar">
                        <PopperFrame></PopperFrame>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Watch;
