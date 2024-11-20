import React from 'react';
import './History.scss';
import CustomTable from '../../Components/CustomTable/CustomTable';

export default function History() {
  return (
    <div className='history__wrapper'>
      <CustomTable hasActionColumn={true}/>
    </div>
  )
}
