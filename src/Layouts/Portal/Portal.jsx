import React from 'react';
import { createPortal } from "react-dom";
import './Portal.scss';
import CrossIcon from '../../assets/svg/crossIcon.svg'

export default function Portal({ children, isOpen, onClose }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="popup-overlay" onClick={onClose}>
            <div
                className="popup-content"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing popup
            >
                <button className="close-button" onClick={onClose}>
                    <img src={CrossIcon} alt='icon'/>
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("portal-root")
    );
}
