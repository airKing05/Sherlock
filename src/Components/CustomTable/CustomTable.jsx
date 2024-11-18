import React from 'react';
import './CustomTable.scss';



export default function CustomTable({data}) {
    const userData = data?.answer?.data;
  return (
      <div className="table-container">
          <table className="styled-table">
            <thead>
            <tr>
            {
                    Object.keys(userData[0]).map((_col, index) => {
                    return <th key={index}>{_col}</th>
                })  
            }
                  </tr>
            </thead>
            <tbody>
                {  userData.map((_row, rowIdx) => {
                    return <tr key={rowIdx}>
                    {
                        Object.values(_row).map((_col, colIdx) => {
                             return <td key={colIdx}>{typeof(_col) !== 'object' ? _col : "_"}</td>
                        })  
                    }
                    </tr>
                })}
            </tbody>

        </table>
    </div>
  )
}
