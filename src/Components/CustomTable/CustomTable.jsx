import React, { useMemo, useState } from 'react';
import './CustomTable.scss';
import MenuIcon from '../../assets/svg/menuDoteIcon.svg';


const customData = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "phone": "1-770-736-8031",
        "website": "hildegard.org",
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "phone": "010-692-6593",
        "website": "anastasia.net",
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "phone": "1-463-1234447",
        "website": "ramiro.info",
    },
]

const customData2 = {
    rows : [
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "phone": "1-770-736-8031",
            "website": "hildegard.org",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv",
            "phone": "010-692-6593",
            "website": "anastasia.net",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "username": "Samantha",
            "email": "Nathan@yesenia.net",
            "phone": "1-463-1234447",
            "website": "ramiro.info",
        }, 
    ],
    cols: [
        {
            field : 'id',
            title: 'Id'
        },
        {
            field: 'name',
            title: 'Name'
        },
        {
            field: 'username',
            title: 'User Name'
        },
        {
            field: 'email',
            title: 'Email Id'
        },
        {
            field: 'phone',
            title: 'Contact'
        },
        {
            field: 'website',
            title: 'Bio'
        }
    ]
}


export default function CustomTable({ data = customData, hasActionColumn = false }) {
    const [sortConfig, setSortConfig] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);

    const sortedData = useMemo(() => {
        if (sortConfig) {
            return [...data].sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [data, sortConfig]);

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const toggleMenu = (rowIndex) => {
        setActiveMenu(activeMenu === rowIndex ? null : rowIndex);
    };

    const handleAction = (action, rowIndex) => {
        console.log(`Action: ${action}, Row Index: ${rowIndex}`);
        setActiveMenu(null);
    };

  return (
      <div className="table-container">
          <table className="styled-table">
              <thead>
                  <tr>
                      {
                          Object.keys(data[0]).map((_col, index) => {
                              return <th key={index} onClick={() => handleSort(_col)}>
                                  {_col}
                                  {sortConfig?.key === _col && (
                                      <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                                  )}
                              </th>

                          })
                      }
                      {hasActionColumn && <th>Actions</th>}
                  </tr>
              </thead>
            <tbody>
                  {sortedData.map((_row, rowIdx) => {
                    return <tr key={rowIdx}>
                    {
                        Object.values(_row).map((_col, colIdx) => {
                             return <td key={colIdx}>{typeof(_col) !== 'object' ? _col : "_"}</td>
                        })  
                    }
                        {hasActionColumn && (
                            <td>
                                <button
                                    className="menu-button"
                                    onClick={() => toggleMenu(rowIdx)}
                                >
                                    <img src={MenuIcon} alt='icon'/>
                                </button>
                                {activeMenu === rowIdx && (
                                    <div className="menu-popup">
                                        <div onClick={() => handleAction("delete", rowIdx)}>Delete</div>
                                        <div onClick={() => handleAction("edit", rowIdx)}>Edit</div>
                                    </div>
                                )}
                            </td>
                        )}
                    </tr>
                })}
            </tbody>

        </table>
    </div>
  )
}
