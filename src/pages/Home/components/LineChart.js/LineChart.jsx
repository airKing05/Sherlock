import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import '../Cards/Cards.scss';
import CardLayout from '../../../../Layouts/CardLayout/CardLayout';




export default function LineChart() {
    const d3Container = useRef(null);

    useEffect(() => {
       
        if (d3Container.current) {
            // Clear any existing SVG elements
            d3.select(d3Container.current).select("svg").remove();

            // set the dimensions and margins of the graph
            const margin = { top: 50, right: 30, bottom: 35, left: 100 },
                width = 740 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select(d3Container.current)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            //Read the data
            d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
                (d) => ({ date: d3.timeParse("%Y-%m-%d")(d.date), value: +d.value })
            ).then((data) => {

                // Add X axis --> it is a date format
                const x = d3.scaleTime()
                    .domain(d3.extent(data, d => d.date))
                    .range([0, width]);
                const xAxis = svg.append('g')
                    .attr('transform', `translate(0,${height})`)
                    .call(d3.axisBottom(x))
                    // .selectAll("text")
                    // .style("fill", "#796AFF");

                // // Set X-axis line color
                // svg.select(".x-axis .domain")
                //     .style("stroke", "#888888"); // Set x-axis line color

                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => +d.value)])
                    .range([height, 0]);
                const yAxis = svg.append('g')
                    .call(d3.axisLeft(y))
                    // .selectAll("text")
                    // .style("fill", "#796AFF");

                // // Set Y-axis line color
                // svg.select(".y-axis .domain")
                //     .style("stroke", "#888888"); // Set y-axis line color

                // Add a clipPath: everything out of this area won't be drawn.
                const clip = svg.append('defs').append('svg:clipPath')
                    .attr('id', 'clip')
                    .append('svg:rect')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('x', 0)
                    .attr('y', 0);

                // Add brushing
                const brush = d3.brushX()
                    .extent([[0, 0], [width, height]])
                    .on('end', updateChart);

                // Create the line variable: where both the line and the brush take place
                const line = svg.append('g')
                    .attr('clip-path', 'url(#clip)');

                // Add the line
                line.append('path')
                    .datum(data)
                    .attr('class', 'line')
                    .attr('fill', 'none')
                    .attr('stroke', '#6A0DAD')
                    .attr('stroke-width', 1.5)
                    .attr('d', d3.line()
                        .x(d => x(d.date))
                        .y(d => y(d.value))
                    );

                // Add the brushing
                line.append('g')
                    .attr('class', 'brush')
                    .call(brush);

                // Idle timeout
                let idleTimeout;
                function idled() { idleTimeout = null; }

                // Update chart when brushing is done
                function updateChart(event) {
                    const extent = event.selection;

                    // If no selection, back to initial coordinate. Otherwise, update X axis domain
                    if (!extent) {
                        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // Wait a little bit
                        x.domain(d3.extent(data, d => d.date));
                    } else {
                        x.domain([x.invert(extent[0]), x.invert(extent[1])]);
                        line.select('.brush').call(brush.move, null); // Clear brush selection
                    }

                    // Update axis and line position
                    xAxis.transition().duration(1000).call(d3.axisBottom(x));
                    line.select('.line')
                        .transition()
                        .duration(1000)
                        .attr('d', d3.line()
                            .x(d => x(d.date))
                            .y(d => y(d.value))
                        );
                }

                // If user double-clicks, reinitialize the chart
                svg.on('dblclick', function () {
                    x.domain(d3.extent(data, d => d.date));
                    xAxis.transition().call(d3.axisBottom(x));
                    line.select('.line')
                        .transition()
                        .attr('d', d3.line()
                            .x(d => x(d.date))
                            .y(d => y(d.value))
                        );
                });
            });
        }
    }, [d3Container.current]); // Runs only once, after initial render

  return (
    <CardLayout title="Line chart">
      <div ref={d3Container} />
    </CardLayout>
    
  )
}

