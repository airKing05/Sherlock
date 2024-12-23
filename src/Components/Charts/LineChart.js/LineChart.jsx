import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


const customData = [
    { date: "2024-01-01", value: 10 },
    { date: "2024-01-02", value: 13 },
    { date: "2024-01-03", value: 13 },
    { date: "2024-01-04", value: 49 },
    { date: "2024-01-05", value: 19 },
    { date: "2024-01-06", value: 29 },
    { date: "2024-01-07", value: 31 },
    { date: "2024-01-08", value: 46 },
    { date: "2024-01-09", value: 33 },
    { date: "2024-01-10", value: 16 },
    { date: "2024-01-11", value: 34 },
    { date: "2024-01-12", value: 34 },
    { date: "2024-01-13", value: 22 },
    { date: "2024-01-14", value: 11 },
    { date: "2024-01-15", value: 48 },
    { date: "2024-01-16", value: 49 },
    { date: "2024-01-17", value: 33 },
    { date: "2024-01-18", value: 34 },
    { date: "2024-01-19", value: 27 },
    { date: "2024-01-20", value: 47 },
    { date: "2024-01-21", value: 35 },
    { date: "2024-01-22", value: 23 },
    { date: "2024-01-23", value: 18 },
    { date: "2024-01-24", value: 19 },
    { date: "2024-01-25", value: 30 },
    { date: "2024-01-26", value: 26 },
    { date: "2024-01-27", value: 15 },
    { date: "2024-01-28", value: 25 },
    { date: "2024-01-29", value: 10 },
    { date: "2024-01-30", value: 28 }
]


export default function LineChart({ data = customData, widgetType = "" }) {
    const d3Container = useRef(null);

    useEffect(() => {
       
        if (d3Container.current) {
            // Clear any existing SVG elements
            d3.select(d3Container.current).select("svg").remove();

            // set the dimensions and margins of the graph
            const margin = { top: 50, right: 30, bottom: 50, left: 50 },
                width = (widgetType === 'chat' ? 440 :  740) - margin.left - margin.right,
                height = (widgetType === 'chat' ? 300 : 400) - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select(d3Container.current)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${ widgetType === 'chat' ? 20 : margin.left},${margin.top})`);

            // //Read the data
            // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
            //     (d) => ({ date: d3.timeParse("%Y-%m-%d")(d.date), value: +d.value })
            // ).then((data) => {

            //     // Add X axis --> it is a date format
            //     const x = d3.scaleTime()
            //         .domain(d3.extent(data, d => d.date))
            //         .range([0, width]);
            //     const xAxis = svg.append('g')
            //         .attr('transform', `translate(0,${height})`)
            //         .call(d3.axisBottom(x))
            //         // .selectAll("text")
            //         // .style("fill", "#796AFF");

            //     // // Set X-axis line color
            //     // svg.select(".x-axis .domain")
            //     //     .style("stroke", "#888888"); // Set x-axis line color

            //     // Add Y axis
            //     const y = d3.scaleLinear()
            //         .domain([0, d3.max(data, d => +d.value)])
            //         .range([height, 0]);
            //     const yAxis = svg.append('g')
            //         .call(d3.axisLeft(y))
            //         // .selectAll("text")
            //         // .style("fill", "#796AFF");

            //     // // Set Y-axis line color
            //     // svg.select(".y-axis .domain")
            //     //     .style("stroke", "#888888"); // Set y-axis line color

            //     // Add a clipPath: everything out of this area won't be drawn.
            //     const clip = svg.append('defs').append('svg:clipPath')
            //         .attr('id', 'clip')
            //         .append('svg:rect')
            //         .attr('width', width)
            //         .attr('height', height)
            //         .attr('x', 0)
            //         .attr('y', 0);

            //     // Add brushing
            //     const brush = d3.brushX()
            //         .extent([[0, 0], [width, height]])
            //         .on('end', updateChart);

            //     // Create the line variable: where both the line and the brush take place
            //     const line = svg.append('g')
            //         .attr('clip-path', 'url(#clip)');

            //     // Add the line
            //     line.append('path')
            //         .datum(data)
            //         .attr('class', 'line')
            //         .attr('fill', 'none')
            //         .attr('stroke', '#6A0DAD')
            //         .attr('stroke-width', 1.5)
            //         .attr('d', d3.line()
            //             .x(d => x(d.date))
            //             .y(d => y(d.value))
            //         );

            //     // Add the brushing
            //     line.append('g')
            //         .attr('class', 'brush')
            //         .call(brush);

            //     // Idle timeout
            //     let idleTimeout;
            //     function idled() { idleTimeout = null; }

            //     // Update chart when brushing is done
            //     function updateChart(event) {
            //         const extent = event.selection;

            //         // If no selection, back to initial coordinate. Otherwise, update X axis domain
            //         if (!extent) {
            //             if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // Wait a little bit
            //             x.domain(d3.extent(data, d => d.date));
            //         } else {
            //             x.domain([x.invert(extent[0]), x.invert(extent[1])]);
            //             line.select('.brush').call(brush.move, null); // Clear brush selection
            //         }

            //         // Update axis and line position
            //         xAxis.transition().duration(1000).call(d3.axisBottom(x));
            //         line.select('.line')
            //             .transition()
            //             .duration(1000)
            //             .attr('d', d3.line()
            //                 .x(d => x(d.date))
            //                 .y(d => y(d.value))
            //             );
            //     }

            //     // If user double-clicks, reinitialize the chart
            //     svg.on('dblclick', function () {
            //         x.domain(d3.extent(data, d => d.date));
            //         xAxis.transition().call(d3.axisBottom(x));
            //         line.select('.line')
            //             .transition()
            //             .attr('d', d3.line()
            //                 .x(d => x(d.date))
            //                 .y(d => y(d.value))
            //             );
            //     });
            // });


            // Convert data if needed (e.g., date strings to Date objects)
            const parsedData = data.map(d => ({
                date: d3.timeParse("%Y-%m-%d")(d.date), // parse date if needed
                value: +d.value,
            }));

            // Add X axis
            const x = d3.scaleTime()
                .domain(d3.extent(parsedData, d => d.date))
                .range([0, width]);
        
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                //select all text labels in the axis, then position + rotate
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-1em")
                .attr("dy", "-0.5em")
                .attr("transform", "rotate(-60)");


            // Add Y axis
            const y = d3.scaleLinear()
                .domain([0, d3.max(parsedData, d => d.value)])
                .range([height, 0]);
            const yAxis = svg.append("g")
                .call(d3.axisLeft(y))
                // .selectAll("text")
                // .style("fill", "#4682b4"); // Customize color if desired


          

            // Add line
            svg.append("path")
                .datum(parsedData)
                .attr("fill", "none")
                .attr("stroke", "#ff6347") // Line color
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value))
                );


            const lineGroup = svg.append("g")
                .attr("clip-path", "url(#clip)");

            // Define the brush
            const brush = d3.brushX()
                .extent([[0, 0], [width, height]])
                .on("end", updateChart);

            lineGroup.append("g")
                .attr("class", "brush")
                .call(brush);

            // Zoom function that updates the x-axis based on the brushed area
            function updateChart(event) {
                const extent = event.selection;
                if (!extent) return; // Ignore empty selections

                // Update the x scale domain based on the selection
                const [x0, x1] = extent.map(x.invert);
                x.domain([x0, x1]);

                // Remove brush overlay after zooming
                lineGroup.select(".brush").call(brush.move, null);

                // Update the axis and line
                svg.selectAll(".x-axis").transition().duration(1000).call(d3.axisBottom(x));
                line.transition().duration(1000).attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value))
                );
            }

            // Double-click to reset zoom
            svg.on("dblclick", () => {
                x.domain(d3.extent(parsedData, d => d.date));
                svg.selectAll(".x-axis").transition().call(d3.axisBottom(x));
                line.transition().attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value))
                );
            });
        }
    }, [d3Container.current]); // Runs only once, after initial render

  return (
      <div ref={d3Container} />
  )
}

