import React from "react";
import "./HeatmapCalendar.scss";

const getMonthName = (monthIndex) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[monthIndex];
};

const HeatmapCalendar2 = () => {
    const year = 2024;
    const month = 11;
    const totalDays = new Date(year, month + 1, 0).getDate(); // Get the last day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the first day of the month (0 = Sunday)

    // Heatmap data (example, can be dynamically passed as a prop)
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

    // Create a list of days for the calendar grid
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const monthName = getMonthName(month);
    return (
        <div
            style={{
                width: '400px',
                height: '400px',
                // border: '2px solid gold'
            }}>
            <h2>{`${monthName} ${year}`}</h2>
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


export default HeatmapCalendar2;
