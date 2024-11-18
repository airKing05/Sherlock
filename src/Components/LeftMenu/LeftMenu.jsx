import React, { useState } from 'react';
import "./LeftMenu.scss";
import SunLogoIcon from '../../assets/svg/sunLogo.svg';
import UserIcon from '../../assets/svg/userIcon.svg';
import ExpandMoreIcon from '../../assets/svg/doubleRightArrow.svg';
import ExpandLessIcon from '../../assets/svg/doubleLeftArrow.svg';
import { useNavigate } from 'react-router-dom';




export default function LeftMenu() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState("Chats");

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleMenuItemClick = (item, route) => {
        navigate(route)
        setActiveMenuItem(item);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

            <div className="sidebar__logo">
                <div>
                    <img src={SunLogoIcon} alt="Logo" />
                    {!isCollapsed && <h2>Sherlock</h2>}
                </div>
                <button className="sidebar__toggle" onClick={toggleSidebar}>
                    {!isCollapsed && <img width={20} height={20} src={ExpandLessIcon} alt='icon' />}
                </button>
            </div>
            {isCollapsed 
            && <button className="sidebar__toggle" onClick={toggleSidebar}>
                    <img width={20} height={20} src={ExpandMoreIcon} alt='icon' />
            </button>
            }
           
            <div className="sidebar__user">
                <img src={UserIcon} alt="User Avatar" className="user-avatar" />
                {!isCollapsed && <h3>Alex Ferguson</h3>}
            </div>


            <div className="sidebar__menu">
                <button
                    className={`menu-item ${activeMenuItem === "Chats" ? "active" : ""}`}
                    onClick={() => handleMenuItemClick("Chats", '/')}
                >
                    <span>💬</span> {!isCollapsed && 'Chats'} 
                </button>
                <button
                    className={`menu-item ${activeMenuItem === "History" ? "active" : ""}`}
                    onClick={() => handleMenuItemClick("History", '/history')}
                >
                    <span>📚</span> {!isCollapsed && 'History'} 
                </button>
                <button
                    className={`menu-item ${activeMenuItem === "Apps" ? "active" : ""}`}
                    onClick={() => handleMenuItemClick("Apps")}
                >
                    <span>⚙️</span> {!isCollapsed && 'Apps'} 
                    {/* <span className="badge">3</span> */}
                </button>
            </div>

            <div className="sidebar__sections">
                {!isCollapsed && (
                    <>
                        <h4>PINNED</h4>
                        <ul>
                            <li>How can I improve my time management?</li>
                            <li>What's the best way to learn a new skill?</li>
                        </ul>
                        <h4>CHAT HISTORY</h4>
                        <ul>
                            <li>What's the difference between A and B?</li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};