import React, { useEffect, useRef, useState } from 'react'

export default function usePopupToggle() {
    const [showPopup, setShowPopup] = useState(true);
    const popupRef = useRef(null);

    const togglePopup = () => {
        setShowPopup((prev) => !prev);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const openPopup = () => {
        setShowPopup(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showPopup]);

    return { showPopup, setShowPopup, openPopup, closePopup, togglePopup, popupRef };

}
