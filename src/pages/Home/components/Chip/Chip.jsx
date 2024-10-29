import React from 'react';
import './Chip.scss';
import { ALL_GOOD } from '../../../../Constants/Text';

export default function Chip(props) {
    const {title, status} = props;
  return (
    <div className='chip'>
        <span className='chip__title'>{title}</span>
        &nbsp;
          &#x2022;
          &nbsp;
        <span className={status === ALL_GOOD ? 'text-success' : 'text-error' }>{status}</span>
    </div>
  )
}
