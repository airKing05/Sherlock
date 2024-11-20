import React, { useEffect, useState } from 'react';
import PlusIcon from "../../assets/svg/plusIcon.svg";
import MinusIcon from "../../assets/svg/minusIcon.svg";
import Chip from '../Chip/Chip';
import CodeCard from './CodeCard';
import { HtmlRenderer, ListRenderer, PictureRenderer } from '../../Common/smallComponents/smallComponents';



const customData = [
    {
        title: 'APPLICATION HEALTH',
        status: 'ISSUE FOUNDED',
        color: 'red',
        summary: 'Significant slowdown during pick hours.',
        details: 'The Unicode and HTML Entities But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes •.'
                    },
    {
        title: 'DOWNSTREAM SERVICE',
        status: 'ALL GOOD',
        color: 'green',
        summary: 'All service performing with in normal parameters.',
        details: 'The Unicode and HTML Entities But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes •.'

                    },
    {
        title: 'INFRASTRUCTURE',
        status: 'ISSUE FOUNDED',
        color: 'red',
        summary: 'CPU saturation due to high traffic volume.',
        details: 'The Unicode and HTML Entities But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes •.'

                    },
    {
        title: 'CONFIGURATION',
        status: 'ISSUE FOUNDED',
        color: 'red',
        summary: 'Suboptimal load balancer setting uneven service load.',
        details: 'The Unicode and HTML Entities But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes •.'

                    }
]


const renderAccordionWidgets = (data) => {
    const { widgetType, content } = data;

    switch (widgetType) {
        case 'TEXT':
            return <p>{content}</p>
        case 'HTML':
            return <HtmlRenderer data={content} />
        case 'LIST':
            return <ListRenderer data={content} />
        case 'CODE':
            return <CodeCard data={content} />
        case 'IMAGE':
            return <PictureRenderer data={content} />
        default:
            return <p>{data}</p>;
    }

}

const AccordionRow = (props) => {
    const { data, index, widgetType } = props;
    const [isActive, setIsActive] = useState(false);
    return (
        <li
            key={index}
        >
            <div className={`card__list__item btn`} >
                <div className='card__left'>
                    <Chip title={data.title} status={data.status} color={data.color}/>
                    {
                        widgetType !== 'chat' ? <> &nbsp; {data.summary}</> : null
                    }
                   
                </div>
                <div className='card__right'>
                    <img
                        onClick={() => setIsActive(!isActive)}
                        className='iconContainer mt-1'
                        src={!isActive ? PlusIcon : MinusIcon}
                        alt="Arrow Right Icon"
                    />
                    &nbsp;
                </div>
            </div>
            {isActive && <div className="accordionContent">
            {renderAccordionWidgets(data.details)}
            </div>}
        </li>
    )
}


export default function ChecklistCard({ data = customData, widgetType = '' }) {
    
    return (
        <ul className='card__list'>
            {
                data.length ? data.map((_item, index) => {
                    return <AccordionRow index={index} data={_item} widgetType={widgetType} />
                }) : null}
        </ul>
    )
}
