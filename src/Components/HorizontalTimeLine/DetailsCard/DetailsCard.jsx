import React from 'react';
import './DetailsCard.scss';

export default function DetailsCard({ data }) {
  return (
    <div className='detailsCard__container'>
      <h3>{data && data.title}</h3>
      <p>{data && data.details}</p>
    </div>
  )
}
