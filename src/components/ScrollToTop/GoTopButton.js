import { useEffect, useRef, useState } from 'react';
import { IoMdRocket } from 'react-icons/io';
import './ScrollToTop.scss';

function GoTopButton({ onClick }) {
    const [showGoTop, setShowGoTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 250) {
                setShowGoTop(true);
            } else {
                setShowGoTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean event
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {showGoTop && (
                <button className="go-top" onClick={onClick}>
                    <IoMdRocket />
                </button>
            )}
        </>
    );
}

export default GoTopButton;
