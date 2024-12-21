import React, { Children } from 'react';
import './Button.scss';
import PlusIcon from '../../assets/svg/plusIcon.svg';


export default function Button(props) {
    const { children, onClick, classes, style } = props;

    return (
        <> <button
            className={`button ${classes} `}
            onClick={onClick}
            style={style}
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
