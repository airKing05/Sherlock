import React from 'react';
import Button from '../../Common/Button/Button';

export default function TableActionPopup({ action, data, setTableData, onClose, allData }) {

    const handleSubmit = () => {
        const { rows, cols } = allData;
       const remainingRows = rows.filter((_row) => _row.id !== data.id);
        setTableData({ ...allData, rows: remainingRows })
        onClose();
    }
  return (
    <div className='table_action_popup__container'>
          <h3>{action}, {data.name}</h3>
          <div className='table_action_popup__content'>
              <h6>{data.email}</h6>
              <div className='table_action_popup__action'>
                  <Button
                    onClick={onClose}
                  >Cancel</Button>
                  <Button
                    classes={'button-primary'}
                    onClick={handleSubmit}
                  >Done</Button>
              </div>
          </div>
    </div>
  )
}
