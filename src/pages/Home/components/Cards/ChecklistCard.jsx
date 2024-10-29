import React from 'react';
import ArrowRightIcon from "../../../../assets/svg/arrowRightIcon.svg";
import Chip from '../Chip/Chip';
import CardLayout from '../../../../Layouts/CardLayout/CardLayout';

const cardListData = [
    {
        title: 'APPLICATION HEALTH',
        status: 'ISSUE FOUNDED',
        summary: 'Significant slowdown during pick hours.'
    },
    {
        title: 'DOWNSTREAM SERVICE',
        status: 'ALL GOOD',
        summary: 'All service performing with in normal parameters.'
    },
    {
        title: 'INFRASTRUCTURE',
        status: 'ISSUE FOUNDED',
        summary: 'CPU saturation due to high traffic volume.'
    },
    {
        title: 'CONFIGURATION',
        status: 'ISSUE FOUNDED',
        summary: 'Suboptimal load balancer setting uneven service load.'
    }
]

export default function ChecklistCard() {
    const clickHandler = (action) => {
        console.log(action)
    }
    return (
        <CardLayout title="What we've checked">
            <ul className='card__list'>
                {
                    cardListData.length ? cardListData.map((_item, index) => {
                        return <li 
                        key={index} 
                        className='card__list__item btn'
                        onClick={() => clickHandler(_item)}
                        >
                            <div className='card__left'>
                                <Chip title={_item.title} status={_item.status} />
                                &nbsp; {_item.summary} 
                            </div>
                            <div className='card__right'>
                                <img className='iconContainer mt-1' src={ArrowRightIcon} alt="Arrow Right Icon" /> &nbsp; 
                            </div>
                        </li>
                    }) : null}
            </ul>
        </CardLayout>
    )
}
