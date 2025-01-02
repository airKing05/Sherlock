import React, { useEffect, useState } from 'react';
import './StatusDetailsPopup.scss';
import HeatmapCalendar from '../../HeatmapCalendar/HeatmapCalendar';
import LeftArrowIcon from '../../../assets/svg/leftArrowIcon.svg';

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export default function StatusDetailsPopup() {
    const [activeTab, setActiveTab] = useState("Uptime");
    const [startMonthIndex, setStartMonthIndex] = useState(0); 
    const [year, setYear] = useState(2025); 
    const [currentlySelectedMonths, setCurrentSelectedMonths] = useState([]);

    const handleNext = () => {
        if (startMonthIndex + 2 >= 11) {
            setStartMonthIndex((startMonthIndex + 1) % 12);
            if (startMonthIndex + 1 > 11) setYear(year + 1);
        } else {
            setStartMonthIndex(startMonthIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (startMonthIndex - 1 < 0) {
            setStartMonthIndex(11);
            setYear(year - 1);
        } else {
            setStartMonthIndex(startMonthIndex - 1);
        }
    };

    const setThreeMonthsDetails = () => {
        const monthsDetails = [];

        for (let index = 0; index < 3; index++) {
            const monthIndex = (startMonthIndex + index) % 12;
            const MonthName = months[monthIndex];
            const selectedMonthYear = startMonthIndex + index > 11 ? year + 1 : year;
             const monthObject = {
                index: monthIndex,
                 month: MonthName,
                 year: selectedMonthYear
             }
            monthsDetails.push(monthObject)
        }

        setCurrentSelectedMonths(() => monthsDetails);
    }

    useEffect(() => {
        if (startMonthIndex>-1){
            setThreeMonthsDetails();
        }
    }, [startMonthIndex])
    

    const getRange = () => {
        const endMonthIndex = (startMonthIndex + 2) % 12;
        const startMonth = months[startMonthIndex];
        const endMonth = months[endMonthIndex];

        const endYear = startMonthIndex + 2 > 11 ? year + 1 : year;
        return `${startMonth} ${year} to ${endMonth} ${endYear}`;
    };
    return (
        <div className='status-details-popup__wrapper'>
            <header className="tabs-container">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === "Incidents" ? "active" : ""}`}
                        onClick={() => setActiveTab("Incidents")}
                    >
                        Incidents
                    </button>
                    <button
                        className={`tab ${activeTab === "Uptime" ? "active" : ""}`}
                        onClick={() => setActiveTab("Uptime")}
                    >
                        Uptime
                    </button>
                </div>
            </header>
            <div className="status-content">
                {activeTab === "Incidents" && <section className='status-content__details'>Content for Incidents</section>}
                {
                    activeTab === "Uptime" && <section className='status-content__visual'>
                        <div className='status-content__visual-controls'>
                            <div className="month-range-selector">
                                <button onClick={handlePrevious}>
                                    <img
                                       width={20}
                                       height={20}
                                        src={LeftArrowIcon}
                                        alt='icon'
                                    />
                                </button>
                                <span>{getRange()}</span>
                                <button onClick={handleNext}>
                                    <img
                                        width={20}
                                        height={20}
                                        src={LeftArrowIcon}
                                        alt='icon'
                                    />
                                </button>
                            </div>
                        </div>
                        <div className='status-content__visual-calender'>
                       
                            {
                                currentlySelectedMonths.length ? currentlySelectedMonths.map((_month) => {
                                  return  <React.Fragment key={_month.index}>
                                        <HeatmapCalendar data={_month} />
                                    </React.Fragment>
                                }) : null
                            }
                        </div>
                       
                    </section>
                }
            </div>

        </div>
    )
}
