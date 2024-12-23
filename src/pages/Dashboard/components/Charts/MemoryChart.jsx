import React from "react";
import Chart from "react-apexcharts";

export default function MemoryChart() {
    const actualValue = 90; // Example: Actual memory usage percentage

    // Define ranges with their colors
    const ranges = [
        { color: "#00FF00", start: 0, end: 50 }, // Green range (0-50%)
        { color: "#FFA500", start: 51, end: 80 }, // Orange range (51-80%)
        { color: "#FF0000", start: 81, end: 100 }, // Red range (81-100%)
    ];

    // Find the color for the actual value
    const activeRangeColor = ranges.find(
        (range) => actualValue >= range.start && actualValue <= range.end
    )?.color;

    // Gradient stops for the segmented background path
    const gradientStops = [0, 50, 80, 100];
    const gradientColors = ranges.map((range) => range.color);

    const options = {
        chart: {
            type: "radialBar",
            offsetY: -20,
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    size: "70%", // Size of the hollow center
                },
                track: {
                    show: false, // Disable the default track
                    strokeWidth: "10%"
                },
                dataLabels: {
                    name: {
                        show: true,
                        offsetY: -10,
                        color: "#FFFFFF",
                        fontSize: "16px",
                        formatter: () => "Memory",
                    },
                    value: {
                        show: true,
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: activeRangeColor || "#FFFFFF", // Color matches the active range
                        offsetY: 10,
                        formatter: () => `${actualValue} B`, // Display the actual value
                    },
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: gradientColors, // Colors for the gradient
                // stops: gradientStops, // Gradient stops to define the segments
            },
        },
        stroke: {
            lineCap: "round", // Rounded edges for paths
        },
        labels: ["Memory"],
    };

    // Define the series:
    // - First path: Always 100% to show the segmented background
    // - Second path: Represents the actual value
    const series = [100, actualValue];

    return (
        <div style={{ backgroundColor: "#121212", padding: "20px", borderRadius: "8px" }}>
            <Chart options={options} series={series} type="radialBar" height={200} />
        </div>
    );
};

