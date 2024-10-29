import React from 'react';
import ReloadIcon from '../../../../assets/svg/reloadIcon.svg';
import MenuIcon from '../../../../assets/svg/menuDoteIcon.svg';
import UserIcon from '../../../../assets/svg/userIcon.svg';
import ShareIcon from '../../../../assets/svg/shareIcon.svg';

import './ChatWidget.scss'
import { ME } from '../../../../Constants/Text';



export default function ChatWidget(props) {
    const { chatFor, data } = props;
    return (
        <div className={chatFor === ME ? 'chatWidget__wrapper--me row' : 'chatWidget__wrapper row'}>
            {/* <div className='row'> */}
            <div className='chatWidget__profile'>
                <img className='iconContainer' src={UserIcon} alt='UserIcon' />
            </div>
            <div className='chatWidget__main'>
                <header className='chatWidget__header'>
                    <h5>user name</h5>
                    <div className='chatWidget__verticalLine'></div>
                    <span>12:45 PM</span>
                </header>
                <main className='chatWidget__main'>
                    <p>
                       {data}
                    </p>
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
