import React from 'react';
import ReloadIcon from '../../../../assets/svg/reloadIcon.svg';
import MenuIcon from '../../../../assets/svg/menuDoteIcon.svg';
import UserIcon from '../../../../assets/svg/userIcon.svg';
import ShareIcon from '../../../../assets/svg/shareIcon.svg';

import './ChatWidget.scss'
import { ME } from '../../../../Constants/Text';



export default function ChatWidget(props) {
    const { chatFor, data, children } = props;
    return (
        <div className={chatFor === ME ? 'chatWidget__wrapper--me row' : 'chatWidget__wrapper row'}>
            {/* <div className='row'> */}
            <div className='chatWidget__profile'>
                <img className='iconContainer' src={UserIcon} alt='UserIcon' />
            </div>
            <div className='chatWidget__content__wrapper'>
                <header className='chatWidget__header'>
                    <h6>user name</h6>
                    <div className='chatWidget__verticalLine'></div>
                    <span>12:45 PM</span>
                </header>
                <main className='chatWidget__main'>
                    <div className='chatWidget__content'>
                        {children ? children : data} 
                    </div>
                </main>
                {
                    chatFor !== ME ? <footer className='chatWidget__footer row'>
                        <ul className='chatWidget__footer__iconList'>
                            <li>
                                <img src={ReloadIcon} alt='ReloadIcon' />
                            </li>
                            <li>
                                <img src={ShareIcon} alt='ShareIcon' />
                            </li>
                            <li>
                                <img src={MenuIcon} alt='MenuIcon' />
                            </li>
                        </ul>
                        <div className='chatWidget__footer__tag'>
                            <span>32 Tokens</span>
                        </div>
                    </footer> : null
                }
               

            </div>
            {/* </div> */}
        </div>
    )
}
