import React, { useEffect, useState } from 'react';
import PlusIcon from "../../../../assets/svg/plusIcon.svg";
import MinusIcon from "../../../../assets/svg/minusIcon.svg";
import Chip from '../Chip/Chip';
import CardLayout from '../../../../Layouts/CardLayout/CardLayout';
import { serviceStatus } from '../../../../apis/apis';

const AccordionRow = (props) => {
    const {data, index} = props;
    const [isActive, setIsActive] = useState(false);
return (
    <li
        key={index}
    >
        <div className='card__list__item btn'>
            <div className='card__left'>
                <Chip title={data.title} status={data.status} />
                &nbsp; {data.summary}
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
        {isActive && <div className="accordionContent">{data.details}</div>}
    </li>
)
}


export default function ChecklistCard(props) {
    const {data, title} = props?.data?.answer;


    return (
        <CardLayout title={title}>
            <ul className='card__list'>
                {
                    data.length ? data.map((_item, index) => {
                        return <AccordionRow index={index} data={_item}/>
                    }) : null}
            </ul>
        </CardLayout>
    )
}
