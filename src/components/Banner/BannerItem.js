import { memo } from 'react';
import './Banner.scss';
import { getYear } from 'src/utils/handleDate';
import Button from '../Button';

import { BsPlayCircle } from 'react-icons/bs';
import Image from '../Image';
function BannerItem({ data }) {
    const baseImgURL = process.env.REACT_APP_BASE_IMG_URL;
    const year = getYear(data.release_date || data.first_air_date);

    return (
        <div className="banner-item">
            <Image className="banner-img" src={`${baseImgURL}${data.backdrop_path}`} alt="Slider" />

            <div className="banner-info">
                <h2 className="banner-name">{data.title || data.name}</h2>
                <p className="banner-overview">{data.overview}</p>
                <div className="banner-desc">
                    <p className="banner-year">{year}</p>

                    <Button to="/watch" leftIcon={<BsPlayCircle />} size="small" type="primary">
                        Watch Now
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default memo(BannerItem);
