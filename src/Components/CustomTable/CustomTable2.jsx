import React, { useMemo, useState } from 'react';
import './CustomTable.scss';
import MenuIcon from '../../assets/svg/menuDoteIcon.svg';
import Portal from '../../Layouts/Portal/Portal';
import TableActionPopup from './TableActionPopup';



export default function CustomTable2({ data, hasActionColumn = false, handleOpenHistoryDetails=()=>{} }) {
    const [sortConfig, setSortConfig] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [action, setAction] = useState('');
    const [openActionPopup, setOpenActionPopup] = useState(false);
    const [tableData, setTableData] = useState(data);

    const sortedData = useMemo(() => {
        if (sortConfig) {
            return [...tableData.rows].sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
                return 0;
            });
        }
        return tableData.rows;
    }, [tableData.rows, sortConfig]);

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
        if (action === 'history-details'){
            handleOpenHistoryDetails(rowIndex);
            setActiveMenu(null);
            return;
        }
        setActiveMenu(null);
        setSelectedRow(data.rows[rowIndex]);
        setAction(action);
        setOpenActionPopup(true);
    };

    return (
        <>      
            <Portal
                isOpen={openActionPopup}
                onClose={() => setOpenActionPopup(false)}
            >
                <TableActionPopup
                    action={action}
                    data={selectedRow}
                    allData = {tableData}
                    setTableData={setTableData}
                    onClose={() => setOpenActionPopup(false)}
                />
            </Portal>
        <div className="table-container">
            <table className="styled-table">
                <thead>
                    <tr>
                        {
                            tableData['cols'].map((_col, index) => {
                                return <th key={index} onClick={() => handleSort(_col.field)}>
                                    {_col.title}
                                    {sortConfig?.key === _col.field && (
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
                                tableData['cols'].map((_col, colIdx) => {
                                    return <td key={colIdx}>{_row[_col.field]}</td>
                                })
                            }
                            {hasActionColumn && (
                                <td>
                                    <button
                                        className="menu-button"
                                        onClick={() => toggleMenu(rowIdx)}
                                    >
                                        <img src={MenuIcon} alt='icon' />
                                    </button>
                                    {activeMenu === rowIdx && (
                                        <div className="menu-popup">
                                            {/* <div onClick={() => handleAction("delete", rowIdx)}>Delete</div> */}
                                            {/* <div onClick={() => handleAction("edit", rowIdx)}>Edit</div> */}
                                            <div onClick={() => handleAction("history-details", rowIdx)}>Open Details</div>
                                        </div>
                                    )}
                                </td>
                            )}
                        </tr>
                    })}
                </tbody>

            </table>
        </div>
        </>
    )
}
