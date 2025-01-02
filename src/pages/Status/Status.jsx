import React, { useState } from 'react'
import LinearStatusView from './LinearStatusView';
import './Status.scss';
import StatusCard from './StutusCard';
import StatusPopup from './StatusPopup';
import HeatmapCalendar from './HeatmapCalendar';
import HeatmapCalendar2 from './HeatmapCalendar2';

const majorOutage = Array.from({ length: 90 }, (_, index) => ({
    day: `Day ${index + 1}`,
    status: Math.random() > 0.8 ? "red" : Math.random() > 0.6 ? "yellow" : "green",
}));

const normal = Array.from({ length: 90 }, (_, index) => ({
    day: `Day ${index + 1}`,
    status: index === 50 ? "yellow" : "green",
}));

const currentMonth = 6; 
const currentYear = 2024;
const heatmapData = [
    { "date": "2024-12-01", "count": 5 },
    { "date": "2024-12-02", "count": 1 },
    { "date": "2024-12-03", "count": 4 },
    { "date": "2024-12-04", "count": 4 },
    { "date": "2024-12-05", "count": 4 },
    { "date": "2024-12-06", "count": 4 },
    { "date": "2024-12-07", "count": 2 },
    { "date": "2024-12-08", "count": 5 },
    { "date": "2024-12-09", "count": 0 },
    { "date": "2024-12-10", "count": 5 },
    { "date": "2024-12-11", "count": 0 },
    { "date": "2024-12-12", "count": 5 },
    { "date": "2024-12-13", "count": 1 },
    { "date": "2024-12-14", "count": 2 },
    { "date": "2024-12-15", "count": 3 },
    { "date": "2024-12-16", "count": 2 },
    { "date": "2024-12-17", "count": 0 },
    { "date": "2024-12-18", "count": 5 },
    { "date": "2024-12-19", "count": 5 },
    { "date": "2024-12-20", "count": 2 },
    { "date": "2024-12-21", "count": 4 },
    { "date": "2024-12-22", "count": 3 },
    { "date": "2024-12-23", "count": 3 },
    { "date": "2024-12-24", "count": 2 },
    { "date": "2024-12-25", "count": 5 },
    { "date": "2024-12-26", "count": 4 },
    { "date": "2024-12-27", "count": 2 },
    { "date": "2024-12-28", "count": 0 },
    { "date": "2024-12-29", "count": 0 },
    { "date": "2024-12-30", "count": 0 },
    { "date": "2024-12-31", "count": 0 },

];


export default function Status() {
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    return (
        <div className='status__wrapper'>
            <section className='status__header'>
                <StatusCard />
            </section>
            <main className='status__main'>
                <div className='status__left-section'>
                    <LinearStatusView 
                    data={normal} 
                    status="Normal" 
                    title="User Portal" 
                    openStatusPopup = {() => setShowStatusPopup(true)}
                    />
                    <LinearStatusView data={majorOutage} status="Major Outage" title="Admin Portal" />
                    <LinearStatusView data={majorOutage} status="Major Outage" title="Admin Portal" />

                    <LinearStatusView data={majorOutage} status="Major Outage" title="Admin Portal" />

                    <LinearStatusView data={majorOutage} status="Major Outage" title="Admin Portal" />

                </div>
                {
                    showStatusPopup && <div className='status__right-section'>
                        <StatusPopup 
                            closeStatusPopup={() => setShowStatusPopup(false)}
                        />
                    </div>
                }
               
            </main>
            &nbsp;
            &nbsp;

            <section className='calendar__section'>
                <HeatmapCalendar
                    month={currentMonth}
                    year={currentYear}
                    data={heatmapData}
                    start="2024-11-1"
                    end="2024-11-31"
                />
                <HeatmapCalendar2/>
            </section>
        </div>
    )
}
