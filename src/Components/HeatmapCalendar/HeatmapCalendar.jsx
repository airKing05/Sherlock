import React from "react";
import "./HeatmapCalendar.scss";


const HeatmapCalendar = ({ data }) => {
    const { index: month, month: monthName, year } = data;

    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const heatmapData = {
        1: 1,
        2: 5,
        5: 5,
        10: 2,
        12: 4,
        15: 3,
        20: 4,
        25: 6,
        30: 8,
    };

    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    return (
        <div
            className="heatmap-calender__wrapper"
        >
            <div className="heatmap-calender__header">
                <h4>{`${monthName} ${year}`}</h4>
                <label>100%</label>
            </div>
            <div className="calendar-container">
                <div className="calendar-grid" style={{ gridTemplateColumns: `repeat(7, 1fr)` }}>
                    {Array.from({ length: firstDayOfMonth }, (_, i) => (
                        <div key={`empty-${i}`} className="calendar-day empty"></div>
                    ))}

                    {days.map((day) => {
                        const intensity = heatmapData[day] || 0;
                        return (
                            <div
                                key={day}
                                className={`calendar-day intensity-${intensity}`}
                                title={`Day ${day}: ${intensity || "No Data"}`}
                            >
                                {/* {day} */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    );
};


export default HeatmapCalendar;
