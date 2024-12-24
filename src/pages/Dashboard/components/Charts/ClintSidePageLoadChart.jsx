import React from 'react';
import Chart from 'react-apexcharts';



export default function ClintSidePageLoadChart({data}) {
    const { title, data: axisData } = data.answer;

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
            categories: axisData.xaxis.data,
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
    const series = axisData.yaxis;

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
            <h6 style={{ color: "#fff", width: '100%' }}>{title}</h6>
            <Chart type="bar" options={options} series={series} height={200} />
        </div>
    );
}
