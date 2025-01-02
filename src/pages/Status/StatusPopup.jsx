import React from "react";
import "./StatusPopup.scss";
import CrossIcon from '../../assets/svg/crossIcon.svg';
import Logo from '../../assets/svg/sunLogo.svg';



const StatusPopup = ({ closeStatusPopup }) => {
    return (
        <div className="status-popup">
            <div className="status-popup__header">
                <div className="status-popup__title">
                    <img
                        src={Logo}
                        alt="Statuspage"
                        className="status-popup__logo"
                    />
                    <span>Statuspage</span>
                </div>
                <div className="status-popup__right-section">
                    <div className="status-popup__notification">1</div>
                    &nbsp;
                    &nbsp;
                    <img 
                        onClick={closeStatusPopup}
                    src={CrossIcon} alt="icon"/>
                </div>
            </div>
            <div className="status-popup__body">
                <div className="status-popup__item">
                    <span className="status-popup__dot"></span>
                    <span className="status-popup__issue">Login Issues</span>
                </div>
                <div className="status-popup__details">
                    <p>
                        <strong>Identified</strong> - We’ve identified the login issue due to a recent code push
                        and are in the process of rolling back our latest deploy. All customers are currently
                        affected.
                    </p>
                    <span className="status-popup__timestamp">Jul 19, 2016 3:11PM</span>
                </div>
                <div className="status-popup__details">
                    <p>
                        <strong>Investigating</strong> - We’ve received a few reports of customers unable to
                        login to the dashboard and are looking into the issue.
                    </p>
                    <span className="status-popup__timestamp">Jul 19, 2016 2:45PM</span>
                </div>
            </div>
            <div className="status-popup__footer">
                <a href="#history" className="status-popup__link">
                    Hide full history
                </a>
                <a href="#discuss" className="status-popup__link">
                    Discuss
                </a>
            </div>
        </div>
    );
};

export default StatusPopup;
