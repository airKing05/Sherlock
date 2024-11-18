import React, { useState } from 'react';
import "./PageLayout.scss";
import Chats from '../../pages/Chats/Chats';
import ChatIcon from '../../assets/svg/chatIcon.svg';
import CrossIcon from '../../assets/svg/crossIcon.svg';
import LeftMenu from '../../Components/LeftMenu/LeftMenu';


export default function PageLayout({ children }) {
    const [isRightSectionCollapsed, setIsRightSectionCollapsed] = useState(true);
    return (
        <div className='pageLayout__container'>
            <div className='pageLayout__container__sections__horizontal'>
                <section className='pageLayout__container__leftSection'>
                    <LeftMenu/>
                </section>
                <section className='pageLayout__container__centerSection'>
                    {children}
                </section>
                <section className={`pageLayout__container__rightSection ${isRightSectionCollapsed ? 'collapsedRight' : ''}`}>
                {
                        isRightSectionCollapsed ? <div className='pageLayout__container__rightSection__renderIcon'>
                        <span
                            onClick={() => setIsRightSectionCollapsed(false)}
                        >
                            <img src={ChatIcon} alt='chat-icon' />
                        </span>
                        </div> : 
                            <div className='pageLayout__container__rightSection__renderComponent'>
                            <span
                                onClick={() => setIsRightSectionCollapsed(true)}
                            >
                                <img src={CrossIcon} alt='cross-icon' />
                            </span>
                                <Chats isRightSectionCollapsed={isRightSectionCollapsed}/>
                        </div>
                }
                   
                  
                </section>
            </div>
        </div>
    )
}
