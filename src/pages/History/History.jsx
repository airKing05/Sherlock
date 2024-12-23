import React from 'react';
import './History.scss';
import CustomTable from '../../Components/CustomTable/CustomTable';
import CustomTable2 from '../../Components/CustomTable/CustomTable2';
import TableActionPopup from '../../Components/CustomTable/TableActionPopup';

export default function History() {
  return (
    <>
    <div className='history__wrapper'>
      <CustomTable2 hasActionColumn={true}/>
    </div>
    </>
  )
}
