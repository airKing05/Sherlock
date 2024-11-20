import React from 'react';
import './smallComponents.scss';

export function ListRenderer({ data }) {
    return (
        <div className='common__wrapper list__wrapper'>
            <ul>
                {
                    data.map((_content, index) => {
                        return <li key={index}>{_content}</li>
                    })
                }
            </ul>
        </div>

    )
}


export function HtmlRenderer({ data }) {
    return (
        <div className='common__wrapper html__wrapper'>
            <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>

    )
}

export function PictureRenderer({ data }) {
    return (
        <div className='common__wrapper'>
            <img src={data} width="100%" height={200}/>
        </div>

    )
}
