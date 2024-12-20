import React from 'react';
import Chart from 'react-apexcharts';

export default function GoogleHits() {
    const options = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            background: '#1E1E1E', // Dark background
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '86%',
                borderRadius: 0,
                colors: {
                    backgroundBarColors: ['#404040'], // Background bar color
                    backgroundBarOpacity: 1, // Fully visible background bar
                    // backgroundBarRadius: 5,
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val,
            style: {
                colors: ['#00BFFF', '#00BFFF', '#00BFFF', '#C71585', '#00BFFF'], // Label colors
                fontSize: '14px',
                fontWeight: 'bold',
            },
            offsetY: '110%',
        },
        xaxis: {
            categories: ['A-series', 'B-series', 'C-series', 'D-series', 'E-series'],
            labels: {
                style: {
                    colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            show: false,
            // labels: {
            //     style: {
            //         colors: '#FFFFFF',
            //     },
            // },
            max: 100, // Ensure the y-axis scales to the full height (100)
        },
        grid: {
            borderColor: '#404040',
        },
        colors: ['#0073FF', '#0073FF', '#0073FF', '#9400D3', '#0073FF'], // Bar colors
        tooltip: {
            theme: 'dark',
        },
    };

    const series = [
        {
            name: 'Google hits',
            data: [4, 27.7, 37.1, 66.5, 21.2], // Actual data values
        },
    ];
    return (
         <div 
                className='custom_memory-cpu'
                style={{ paddingBottom: "2px", background: "#1e1e2f", borderRadius: "2px", margin: '10px', textAlign:'center' }}>
                    <h6 style={{ color: "#fff", width: '100%' }}>Google hits</h6>
                    <Chart options={options} series={series} type="bar" height={200} />
                </div>
       
    );
};
