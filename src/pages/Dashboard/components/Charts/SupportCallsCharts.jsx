import React from 'react';
import ApexCharts from 'react-apexcharts';

export default function SupportCallsCharts() {
    const series = [
        {
            name: 'Value',
            data: [30, 50, 35, 50, 49, 110, 70, 91, 350, 30, 90, 32, 50, 35, 59, 49, 130, 70, 91, 103, 30, 92],
        },
    ];
    const pickPoint = Math.max(...series[0].data);
    const chartOptions = {
        chart: {
            type: 'area',
            toolbar: {
                show: false,  // Hide toolbar
            },
            zoom: {
                enabled: false,  // Disable zoom
            },
        },
        plotOptions: {
            area: {
                borderRadius: 0, // No border-radius, sharp corners
            },
        },
        dataLabels: {
            enabled: false,  // Disable data labels
        },
        tooltip: {
            enabled: true,  // Enable tooltips
            followCursor: true,  // Tooltip follows cursor
            theme: 'dark', // Dark tooltip theme
        },
        xaxis: {
            labels: {
                show: false,  // Hide X axis labels
            },
            axisTicks: {
                show: false,  // Hide X axis ticks
            },
        },
        yaxis: {
            labels: {
                show: false,  // Hide Y axis labels
            },
            axisTicks: {
                show: false,  // Hide Y axis ticks
            },
        },
        grid: {
            show: false,  // Hide grid lines
        },
        stroke: {
            curve: 'straight',  // Sharp, straight line instead of curvy
            width: 3,  // Thicker line for sharpness
            colors: ['#ffbc00'],  // Line color (e.g., orange)
        },
        
    };

    return (
        <div
            className='custom_memory-cpu'
            style={{
                paddingBottom: "2px", background: "#1e1e2f", borderRadius: "2px", margin: '10px', textAlign: 'center',
                position:'relative',
                width: '176px',
                height: '100px'
            }}
        >
            <h6 style={{ color: "#fff", width: '100%' }}>Support calls</h6>
            <span style={{
                color: '#ffbc00',
                position: 'absolute',
                top: '15%'
            }}>{pickPoint}</span>
            <ApexCharts
                options={chartOptions}
                series={series}
                type="area"
                // width="100%"
                // height="100%"
            />
        </div>
    );
}
