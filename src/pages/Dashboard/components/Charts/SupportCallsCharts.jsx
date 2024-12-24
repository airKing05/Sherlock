import React from 'react';
import ApexCharts from 'react-apexcharts';



export default function SupportCallsCharts({data}) {
    const { title, data: axisData } = data.answer;

    const options = {
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

    const series = axisData.yaxis;
    const pickPoint = Math.max(...series[0].data);

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
            <h6 style={{ color: "#fff", width: '100%' }}>{title}</h6>
            <span style={{
                color: '#ffbc00',
                position: 'absolute',
                top: '15%'
            }}>{pickPoint}</span>
            <ApexCharts
                options={options}
                series={series}
                type="area"
                // width="100%"
                // height="100%"
            />
        </div>
    );
}
