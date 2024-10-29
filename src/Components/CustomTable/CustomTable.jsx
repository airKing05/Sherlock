import React from 'react';
import './CustomTable.scss';

const userData = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        // "address": {
        //     "street": "Kulas Light",
        //     "suite": "Apt. 556",
        //     "city": "Gwenborough",
        //     "zipcode": "92998-3874",
        // },
        "phone": "1-770-736-8031",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        // "address": {
        //     "street": "Victor Plains",
        //     "suite": "Suite 879",
        //     "city": "Wisokyburgh",
        //     "zipcode": "90566-7771",
        // },
        "phone": "010-692-6593",
        "website": "anastasia.net",
        "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
        }
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        // "address": {
        //     "street": "Douglas Extension",
        //     "suite": "Suite 847",
        //     "city": "McKenziehaven",
        //     "zipcode": "59590-4157",
        // },
        "phone": "1-463-1234447",
        "website": "ramiro.info",
        "company": {
            "name": "Romaguera-Jacobson",
            "catchPhrase": "Face to face bifurcated interface",
            "bs": "e-enable strategic applications"
        }
    },
]

export default function CustomTable() {
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
