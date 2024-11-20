import React, { useState } from 'react';
import "./LeftMenu.scss";
import SunLogoIcon from '../../assets/svg/sunLogo.svg';
import UserIcon from '../../assets/svg/userIcon.svg';
import ExpandMoreIcon from '../../assets/svg/doubleRightArrow.svg';
import ExpandLessIcon from '../../assets/svg/doubleLeftArrow.svg';
import ChatIcon from '../../assets/svg/chatIcon.svg';
import HistoryIcon from '../../assets/svg/historyIcon.svg';
import LoginIcon from '../../assets/svg/loginIcon.svg';


import { useLocation, useNavigate } from 'react-router-dom';




export default function LeftMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState(location.pathname.split('/')[1] !== "" ? location.pathname.split('/')[1] : 'chat' );


    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleMenuItemClick = (item, route) => {
        navigate(route)
        setActiveMenuItem(item);
    };

    const userData = JSON.parse(localStorage.getItem("user")) || {};
    console.log("userData", userData)
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
                <img src={userData?.picture ? userData.picture : UserIcon} alt="User Avatar" className="user-avatar" />
                {!isCollapsed && <h3>{userData?.name}</h3>}
            </div>


            <div className="sidebar__menu">
                <button
                    className={`menu-item ${activeMenuItem === "chat" ? "active" : ""}`}
                    onClick={() => handleMenuItemClick("chat", '/')}
                >
                    <span>
                        <img src={ChatIcon} alt='icon' />
                    </span> {!isCollapsed && 'Chats'} 
                </button>
                <button
                    className={`menu-item ${activeMenuItem === "history" ? "active" : ""}`}
                    onClick={() => handleMenuItemClick("history", '/history')}
                >
                    <span>
                        <img src={HistoryIcon} alt='icon'/>
                    </span> {!isCollapsed && 'History'} 
                </button>
                <button
                    className={`menu-item ${activeMenuItem === "sign-in" ? "active" : ""}`}
                    onClick={() => handleMenuItemClick("sign-in", '/sign-in')}
                >
                    <span>
                        <img src={LoginIcon} alt='icon' />
                    </span> {!isCollapsed && 'Sign-in'}
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