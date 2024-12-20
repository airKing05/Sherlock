import React from 'react';
import Chart from "react-apexcharts";
import './Charts.scss'

export default function MemoryCpuChart() {
    const options = {
        chart: {
            id: "memory-cpu-combo-chart",
            toolbar: { show: false },
            background: "#1e1e2f", 
            type: 'line',
            height: 200,
            parentHeightOffset: 0,
        },
        colors: ["#00bfff", "#ff6347"], 
        stroke: {
            width: [2, 2], 
            curve: ['straight', 'smooth', 'monotoneCubic', 'stepline']
        },
        markers: {
            size: 5,
            colors: ["#00bfff", "#ff6347"], 
            strokeWidth: 2,
            hover: { size: 7 }, // Slightly larger points on hover
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: ["16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50"],
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
        yaxis: [
            {
                title: { text: undefined, style: { color: "#00bfff" } },
                labels: {
                    style: {
                        colors: "#00bfff", // Blue labels
                    },
                },
            },
            {
                opposite: true,
                title: { text: undefined, style: { color: "#ff6347" } },
                labels: {
                    style: {
                        colors: "#ff6347", // Red labels
                    },
                },
            },
        ],
        grid: {
            show: true,
            borderColor: "#333",
            strokeDashArray: 0, // Solid grid lines
            xaxis: {
                lines: { show: true }, // Vertical lines
            },
            yaxis: {
                lines: { show: true }, // Horizontal lines
            },
        },
        fill: {
            type: ["gradient", "solid"], // Gradient for Memory, solid for CPU
            gradient: {
                shade: "dark",
                gradientToColors: ["#4facfe"], // Gradient light blue
                stops: [0, 90],
                opacityFrom: 0.6,
                opacityFrom: 0.6,
                opacityTo: 0.5,
            },
        },
        legend: {
            position: "bottom", 
            horizontalAlign: "right", 
            offsetY: 0,
            labels: { colors: "#ffffff" }, 
            itemMargin: {
                horizontal: 10, // Space between items
                vertical: 5, // Space between rows
            },
            fontSize: "12px", // Font size for legend text
            markers:{
                shape: 'line',
                size: 10,
                strokeWidth: 5,
                radius: 12, 
            },
        },
        
    };

    const series = [
        {
            name: "Memory",
            type: "area", // Area chart for Memory
            data: [2, 3.5, 4, 3.2, 3.8, 2.9, 6],
        },
        {
            name: "CPU",
            type: "line", // Line chart for CPU
            data: [1.5, 2.1, 1.8, 2.7, 3.2, 3.8, 5.5],
        },
    ];

    return (
        <div 
        className='custom_memory-cpu'
        style={{ paddingBottom: "2px", background: "#1e1e2f", borderRadius: "2px", margin: '10px', textAlign:'center' }}>
            <h6 style={{ color: "#fff", width: '100%' }}>Memory / CPU</h6>
            <Chart options={options} series={series} height={200} />
        </div>
    );
}
