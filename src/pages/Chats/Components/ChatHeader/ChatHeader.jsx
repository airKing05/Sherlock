import React, { useEffect, useState } from 'react';
import './ChatHeader.scss';
import PlusIcon from '../../../../assets/svg/plusIcon.svg';
import SettingIcon from '../../../../assets/svg/settingIcon.svg';
import DeleteIcon from '../../../../assets/svg/deleteIcon.svg';
import MenuIcon from '../../../../assets/svg/menuIcon.svg';
import CrossIcon from '../../../../assets/svg/crossIcon.svg';
import Button from '../../../../Common/Button/Button';


export default function ChatHeader() {
    const [menuVisible, setMenuVisible] = useState(false);


    useEffect(() => {
        if (menuVisible){
        if (window.innerWidth < 600) {
            console.log(menuVisible, window.innerWidth)
            setMenuVisible(false);
        }}

    }, [])
    

    return (
        <nav className='chatNav__wrapper'>
            <div className='row chatNav__row'>
                <div className='col chatNav__colLeft'>
                    <h6> How the modal determines token</h6>
                </div>
                <button className='chatNav__toggler'
                aria-expanded={menuVisible}
                onClick={() => setMenuVisible (!menuVisible)}
                >
                {
                    menuVisible ? <img src={CrossIcon} alt='CrossIcon' /> : <img src={MenuIcon} alt='MenuIcon' />
                }
                    {/* <img src={MenuIcon} alt='MenuIcon' /> */}
                   
                </button>
                <div className='col chatNav__colRight'>
                    <ul 
                    // style={{
                    //         transform: menuVisible && 'translateX(0)'
                    // }}
                        className={menuVisible ? 'chatNav__list__visible chatNav__list' : 'chatNav__list'}
                        // className='chatNav__list'
                    >
                        <li>
                            <Button
                            style={{
                                border: '1px solid #ffffff',
                                color: '#ffffff'
                            }}
                            >
                                <>
                                    <img src={PlusIcon} alt='PlusIcon' />
                                    <span>New chat</span> 
                                </>
                            </Button>
                           
                            <div className='vertical-line' >
                                &nbsp;
                                &nbsp;
                            </div>
                            {/* &nbsp;
                            &nbsp; */}
                        </li>
                  
                        <li>
                            <a href='#'>
                                <img src={SettingIcon} alt='SettingIcon' />
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <img src={DeleteIcon} alt='DeleteIcon' />

                            </a>
                        </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}
