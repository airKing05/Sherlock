import React, { Children } from 'react';
import './Button.scss';
import PlusIcon from '../../assets/svg/plusIcon.svg';


export default function Button(props) {
    const { children } = props;
    return (
        <> <button className='button'>
            <div className='button__body'>
                {
                    children
                }
            </div>
        </button>
        </>
    )
}
