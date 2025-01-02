import React from "react";
import "./StatusCard.scss";

const StatusCard = () => {
    return (
        <div className="status-card">
            <div className="status-card__header">
                <span>Sherlock web responsiveness.</span>
                <button className="status-card__subscribe">Subscribe</button>
            </div>
            <div className="status-card__body">
                <p>
                    <strong>Investigating</strong> - We've received reports that our user portal is unresponsive
                    to users attempting to visit the website. We are investigating this now.
                </p>
                <span className="status-card__timestamp">Aug 13, 01:24 UTC</span>
            </div>
            <div className="status-card__body">
                <p>
                    <strong>Investigating</strong> - We've received reports that our user portal is unresponsive
                    to users attempting to visit the website. We are investigating this now.
                </p>
                <span className="status-card__timestamp">Aug 13, 01:24 UTC</span>
            </div>
        </div>
    );
};

export default StatusCard;
