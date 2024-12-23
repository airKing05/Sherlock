import React from 'react';
import './Chip.scss';
import { ALL_GOOD, GREEN } from '../../Constants/Text';

export default function Chip(props) {
    const {title, status, color} = props;
  return (
    <div className='chip'>
        <span className='chip__title'>{title}</span>
        &nbsp;
          &#x2022;
          &nbsp;
      <span className={color === GREEN ? 'text-success' : 'text-error' }>{status}</span>
    </div>
  )
}
