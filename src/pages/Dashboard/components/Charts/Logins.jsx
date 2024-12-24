import React from 'react';
import Chart from 'react-apexcharts';



export default function Logins({data}) {
    const { title, data: axisData } = data.answer;
    const options = {
        chart: {
            type: 'area',
            id: "logins-logins-1hours-chart",
            toolbar: { show: false },
            background: "#1e1e2f", // Dark background
            height: 200,
            parentHeightOffset: 0,
            stacked: true, // Enable stacking
        },
        colors: ["#00bfff", "#ff6347"], // Color for Memory (bottom), Logins (top)
        stroke: {
            curve: 'smooth', // Smooth curves for better look
            width: 1, // Make stroke more visible
        },
        // markers: {
        //     size: 5, // Points at each corner
        //     colors: ["#00bfff", "#ff6347"], // Matching the series
        //     strokeWidth: 2,
        //     hover: { size: 7 }, // Slightly larger points on hover
        // },
        dataLabels: { enabled: false },
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
            title: { text: undefined, style: { color: "#ffffff" } },
            labels: {
                style: {
                    colors: "#00bfff",
                },
            },
        },
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
            type: "gradient",
            gradient: {
                shade: "dark",
                gradientToColors: ["#4facfe", "#00bfff"], // Gradient light blue to match
                stops: [0, 90],
                opacityFrom: 0.6,
                opacityTo: 0.5,
            },
        },
        legend: {
            position: "bottom", // Positioned at the top
            offsetY: 0, // Adjust vertical alignment
            labels: { colors: "#ffffff" }, // White text
            markers: {
                width: 10, // Size of the colored dots
                height: 10,
                radius: 12, // Rounded dots
            },
            itemMargin: {
                horizontal: 10, // Space between items
                vertical: 5, // Space between rows
            },
            fontSize: "12px", // Font size for legend text
            markers: {
                shape: 'line',
                size: 10,
                strokeWidth: 5,
                // customHTML: function(props) {
                //     console.log("props", props)
                //     return '<div class="custom-marker">b</div>'
                // }
            },
        },
    };

    // Updated Data with Your Provided Values
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
            <Chart options={options} series={series} height={200} />
        </div>
    );
}
