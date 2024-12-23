import React from 'react';
import Chart from 'react-apexcharts';

export default function ClintSidePageLoadChart() {
    const options = {
        chart: {
            id: "client-side-page-load-chart",
            toolbar: { show: false },
            background: "#1e1e2f", // Dark background
            height: 200,
            stacked: true, // Enable stacking of bars
        },
        colors: ['#FF5733', '#FF6F41', '#FF7F51', '#FF8F61', '#FF9F71'], // Colors for stacked bars
        plotOptions: {
            bar: {
                horizontal: false, // Vertical bars
                columnWidth: '70%', // Width of bars
                // distributed: true, // Evenly distributed bars (optional)
            },
        },
        dataLabels: { enabled: false }, // Disable data labels
        xaxis: {
            categories: ["16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50"], // X-axis values (time)
            labels: {
                style: {
                    colors: "#ffffff", // White axis labels
                },
            },
            axisBorder: {
                color: "#555",
            },
            axisTicks: {
                color: "#555",
            },
        },
        yaxis: {
            title: { text: undefined, style: { color: "#ffffff" } }, // Y-axis labels in white
            labels: {
                style: {
                    colors: "#00bfff", // Blue labels for y-axis
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#333",
            strokeDashArray: 0, // Solid grid lines
            xaxis: {
                lines: { show: true }, // Vertical grid lines
            },
            yaxis: {
                lines: { show: true }, // Horizontal grid lines
            },
        },
        fill: {
            opacity: 1, // Set full opacity for bars to ensure they are filled
        },
        legend: {
            position: "bottom",
            offsetY: 0, 
            labels: { colors: "#ffffff" }, 
            itemMargin: {
                horizontal: 10, 
                vertical: 5, 
            },
            fontSize: "12px",
            markers: {
                shape: 'line',
                size: 10,
                strokeWidth: 5,
                
            },
        },

    };

    // Updated Data with 5 series
    const series = [
        {
            name: "Memory",
            data: [60, 65, 55, 58, 70, 51, 72],
        },
        {
            name: "Logins(-1 hour)",
            data: [30, 35, 25, 28, 40, 21, 42],
        },
        {
            name: "CPU Usage",
            data: [20, 18, 23, 21, 30, 25, 15], // New data series 3
        },
        {
            name: "Disk Usage",
            data: [5, 10, 7, 8, 10, 6, 12], // New data series 4
        },
        {
            name: "Network Traffic",
            data: [15, 12, 18, 16, 22, 20, 18], // New data series 5
        },
    ];

    return (
        <div
            className='custom_login'
            style={{
                paddingBottom: "2px",
                background: "#1e1e2f",
                borderRadius: "2px",
                margin: '10px',
                textAlign: 'center'
            }}
        >
            <h6 style={{ color: "#fff", width: '100%' }}>Client side page load</h6>
            <Chart type="bar" options={options} series={series} height={200} />
        </div>
    );
}
