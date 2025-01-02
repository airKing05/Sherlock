import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './HeatmapCalendar.scss';



const HeatmapCalendar = ({ month, year, data, start, end }) => {
    const startDate = new Date(2024, 11, 1); // December 2024
    const endDate = new Date(2024, 11, 31);


    return (
        <div style={{
            width: '400px',
            height: '400px',
            // border: '2px solid gold'
        }}>
            <h2>{startDate.toLocaleString('default', { month: 'long' })} {year}</h2>
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={data}
                horizontal={false}
                classForValue={(value) => {
                    if (!value) return 'color-empty';
                    return `color-scale-${value.count}`;
                }}
                // showWeekdayLabels
                tooltipDataAttrs={(value) => ({
                    'data-tip': value.date
                        ? `Date: ${value.date}, Count: ${value.count}`
                        : 'No Data',
                })}
            />
        </div>
    );
};

export default HeatmapCalendar;
