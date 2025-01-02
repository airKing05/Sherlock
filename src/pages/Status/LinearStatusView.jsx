import React, { useState } from "react";
import "./LinearStatusView.scss";
import PlusIcon from "../../assets/svg/plusWithBorder.svg";
import MinusIcon from "../../assets/svg/minusWithBorder.svg";
import HistoryIcon from "../../assets/svg/historyIcon.svg";


const LinearStatusView = ({ data, status, title, openStatusPopup = () => { }, openStatusDetailsPopup = () => { } }) => {
    const [tooltip, setTooltip] = useState({ visible: false, day: "", status: "", x: 0, y: 0 });
    const [showBar, setShowBar] = useState(false);

    const handleMouseEnter = (event, day, status) => {
        const rect = event.target.getBoundingClientRect();
        setTooltip({
            visible: true,
            day,
            status,
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, day: "", status: "", x: 0, y: 0 });
    };

    const handleExpandStatusContent = (event) => {
        event.stopPropagation();
        setShowBar(!showBar)
    }

    return (
        <div className="status-container"
            onClick={openStatusDetailsPopup}
        >
            <header>
                <div className="status__title-section">
                    <h4
                        onClick={(e) => handleExpandStatusContent(e)}
                    >
                        <img
                            width={20}
                            height={20}
                            src={showBar ? MinusIcon : PlusIcon}
                            alt="icon" />
                        &nbsp;
                        <span>{title}</span>
                        &nbsp;
                        &nbsp;

                    </h4>
                    <img
                        width={20}
                        height={20}
                        src={HistoryIcon}
                        alt="icon"
                        onClick={(e)=>{
                            e.stopPropagation();
                            openStatusPopup();
                        }}
                    />
                </div>

                <label>{status}</label>
            </header>
            {
                showBar && <section>
                    <div className="status-bars">
                        {data.map((entry, index) => (
                            <div
                                key={index}
                                className={`status-bar ${entry.status}`}
                                onMouseEnter={(e) => handleMouseEnter(e, entry.day, entry.status)}
                                onMouseLeave={handleMouseLeave}
                            ></div>
                        ))}
                    </div>
                    {tooltip.visible && (
                        <div
                            className="tooltip"
                            style={{ left: tooltip.x, top: tooltip.y }}
                        >
                            <p>{tooltip.day}</p>
                            <p>Status: {tooltip.status}</p>
                        </div>
                    )}
                    <div className="status-footer">
                        <span>90 days ago</span>
                        <div className="line"></div>
                        <span>99.33% uptime</span>
                        <div className="line"></div>
                        <span>Today</span>
                    </div>
                    {/* <span className="summary">{status}</span> */}
                </section>
            }

        </div>
    );
};

export default LinearStatusView;
