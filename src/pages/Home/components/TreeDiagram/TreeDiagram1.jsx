import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = {
    nodes: [
        { id: '1', label: 'Login Failures', icon: '🔒' },
        { id: '2', label: 'DB Connectivity?', icon: '⛪' },
        { id: '3', label: 'Pool Issues?', icon: '💾' },
        { id: '4', label: 'Max Connections?', icon: '📈' },
        { id: '5', label: 'Query Delays', icon: '⏱' },
        { id: '6', label: 'Query Delays 1', icon: '🗝️' },
        { id: '7', label: 'Query Delays 2', icon: '🛎️' },
        { id: '8', label: 'Query Delays 3', icon: '🧳' },
        { id: '9', label: 'Query Delays 4', icon: '📱' },
        { id: '10', label: 'Query Delays 5', icon: '📡' },
        { id: '11', label: 'Query Delays 6', icon: '💡' },
        { id: '12', label: 'Query Delays 7', icon: '🕯️' },

    ],
    links: [
        { source: '1', target: '2' },
        { source: '2', target: '3' },
        { source: '2', target: '4' },
        { source: '3', target: '5' },
        { source: '3', target: '8' },
        { source: '4', target: '6' },
        { source: '4', target: '7' },
        { source: '6', target: '9' },
        { source: '3', target: '10' },
        { source: '9', target: '11' },
        { source: '9', target: '12' },
    ],
};

const TreeDiagram1 = () => {
    const svgRef = useRef();

    useEffect(() => {
        const width = 1200;
        const height = 800;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#f8f9fa');

        const simulation = d3.forceSimulation(data.nodes)
            .force('link', d3.forceLink(data.links).id((d) => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const highlightedEdges = new Set(['1-2', '2-4', '4-7']); // Define highlighted edges

        // Filter links for highlighting
        const highlightedLinks = data.links.filter((d) => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetId = typeof d.target === 'object' ? d.target.id : d.target;
            return highlightedEdges.has(`${sourceId}-${targetId}`);
        });


        const link = svg.append('g')
            .attr('class', 'links')
            .selectAll('path')
            .data(data.links)
            .join('path')
            .attr('fill', 'none')
            .attr('stroke', (d) => {
                const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
                const targetId = typeof d.target === 'object' ? d.target.id : d.target;
                return highlightedEdges.has(`${sourceId}-${targetId}`) ? 'green' : '#999';
            })
            .attr('stroke-width', (d, i) => data.nodes.length * 1.1 - i * 1.1) // Dynamic edge thickness
            .attr('stroke-linecap', 'round');
        // Edge thickness decreases for farther links


        const linkLabels = svg.append('g')
            .attr('class', 'link-labels')
            .selectAll('g')
            .data(highlightedLinks)
            .join('g')
            .attr('class', 'link-label-group');

        // Add background rectangles for labels
        linkLabels
            .append('rect')
            .attr('rx', 5) // Rounded corners
            .attr('ry', 5)
            .attr('fill', 'yellow') // Yellow background
            .attr('stroke', 'blue') // Optional border (blue for contrast)
            .attr('stroke-width', 0.5); // Border width

        // Add text for labels
        linkLabels
            .append('text')
            .attr('text-anchor', 'middle') // Center align text
            .attr('dy', '0.35em') // Vertically align text
            .style('font-size', '12px')
            .style('fill', 'blue') // Blue text color
            .text((d) => {
                const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
                const targetId = typeof d.target === 'object' ? d.target.id : d.target;
                return `${sourceId} → ${targetId}`; // Label text
            });

        const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(data.nodes)
            .join('g')
            .call(
                d3
                    .drag()
                    .on('start', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on('drag', (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on('end', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    })
            );

        node.append('circle')
            .attr('r', 30)
            .attr('fill', '#FAF9F6')
            .attr('stroke', '#D3D3D3')
            .attr('stroke-width', 2);

        node.append('text')
            .attr('class', 'node-icon')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('fill', '#fff')
            .style('font-size', '20px')
            .text((d) => d.icon);

        node.append('text')
            .attr('class', 'node-label')
            .attr('x', 40) // Position the label to the right of the circle
            .attr('y', 5) // Center align vertically with the node
            .attr('fill', '#333')
            .style('font-size', '14px')
            .text((d) => d.label);

        simulation.on('tick', () => {
            link.attr('d', (d) => {
                const sourceX = d.source.x;
                const sourceY = d.source.y;
                const targetX = d.target.x;
                const targetY = d.target.y;

                // S-shaped curve
                const controlX1 = (sourceX + targetX) / 2;
                const controlY1 = sourceY;
                const controlX2 = (sourceX + targetX) / 2;
                const controlY2 = targetY;

                return `M${sourceX},${sourceY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${targetX},${targetY}`;
            });

            linkLabels
                .attr('transform', (d) => {
                    const x = (d.source.x + d.target.x) / 2;
                    const y = (d.source.y + d.target.y) / 2;
                    return `translate(${x},${y})`;
                });

            linkLabels.select('rect')
                .attr('width', function () {
                    return this.nextSibling.getBBox().width + 10; // Add padding around text
                })
                .attr('height', function () {
                    return this.nextSibling.getBBox().height + 4; // Add padding around text
                })
                .attr('x', function () {
                    return -(this.getBBox().width / 2); // Center the rectangle
                })
                .attr('y', function () {
                    return -(this.getBBox().height / 2); // Center the rectangle
                });

            node.attr('transform', (d) => `translate(${d.x},${d.y})`);
        });
    }, []);
    return <svg ref={svgRef}></svg>;
};


export default TreeDiagram1;
