import React from 'react';
import './CardLayout.scss';

export default function CardLayout({ title, children, icon }) {
    return (
        <div className='cardWrapper card'>
            <div className={icon ? 'row' : '' }>
                {icon && (
                    <div className='card__left'>
                        <img width={25} height={25} src={icon} alt='card icon' />
                    </div>
                )}
                <div className='card__right'>
                    {title && <h5 className='card__title'>{title}</h5>}
                    <div className='card__body'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
