import React, { Children } from 'react';
import './Button.scss';
import PlusIcon from '../../assets/svg/plusIcon.svg';


export default function Button(props) {
    const { children, onClick, classes } = props;

    return (
        <> <button
            className={`button ${classes} `}
            onClick={onClick}
        >
            <div className='button__body'>
                {
                    children
                }
            </div>
        </button>
        </>
    )
}
