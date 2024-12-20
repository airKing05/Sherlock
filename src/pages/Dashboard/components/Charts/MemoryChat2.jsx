import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function MemoryChat2() {
   const value = 20;
    const max = 100;
    const svgRef = useRef();

    useEffect(() => {
        // Dimensions
        const width = 200;
        const height = 120;
        const innerRadius = 70;
        const outerRadius = 90;

        // Clear the SVG content
        d3.select(svgRef.current).selectAll("*").remove();

        // Create the SVG container
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        const chartGroup = svg
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height})`);

        // Scale for the gauge
        const scale = d3.scaleLinear().domain([0, max]).range([-Math.PI / 2, Math.PI / 2]);

        // Arc generator
        const arcGenerator = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(scale(0));

        // Segmented Background Track
        const segments = [
            { value: max * 0.5, color: "green" },
            { value: max * 0.8, color: "orange" },
            { value: max, color: "red" },
        ];

        let cumulativeValue = 0;
        segments.forEach((segment) => {
            chartGroup
                .append("path")
                .datum({
                    startAngle: scale(cumulativeValue),
                    endAngle: scale(cumulativeValue + segment.value),
                })
                .attr("d", d3.arc().innerRadius(innerRadius).outerRadius(outerRadius))
                .style("fill", segment.color);

            cumulativeValue += segment.value;
        });

        // Dynamic Foreground Track
        chartGroup
            .append("path")
            .datum({ endAngle: scale(value) })
            .attr("d", arcGenerator)
            .style("fill", value > 0.8 * max ? "red" : value > 0.5 * max ? "orange" : "green");

        // Add Value Text
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("fill", value > 0.8 * max ? "red" : value > 0.5 * max ? "orange" : "green")
            .text(`${value} B`);

        // Add Label Text
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("fill", "#D0D0D0")
            .text("Memory");
    }, [value, max]);

    return <svg ref={svgRef}></svg>;
}
