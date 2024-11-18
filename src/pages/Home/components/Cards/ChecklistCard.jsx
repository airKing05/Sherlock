import React, { useEffect, useState } from 'react';
import ArrowRightIcon from "../../../../assets/svg/arrowRightIcon.svg";
import Chip from '../Chip/Chip';
import CardLayout from '../../../../Layouts/CardLayout/CardLayout';
import { serviceStatus } from '../../../../apis/apis';
import useApiRequest from '../../../../Hooks/useApiRequest';

const cardListData = serviceStatus();

export default function ChecklistCard() {
    const [respData, error, loading] = useApiRequest('https://jsonplaceholder.typicode.com/todos');



    console.log(respData, loading, error)
    
    const clickHandler = (action) => {
        // console.log(action)
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
