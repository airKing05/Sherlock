import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './TreeDiagram.scss';
import Portal from '../../../../Layouts/Portal/Portal';
import DetailsCard from '../../../../Components/HorizontalTimeLine/DetailsPopup/DetailsPopup';

// const data = {
//     nodes: [
//         { id: '1', label: 'Login Failures', icon: '🔒', details: 'Possible login issues detected.' },
//         { id: '2', label: 'DB Connectivity?', icon: '⛪', details: 'Check database connection settings.' },
//         { id: '3', label: 'Pool Issues?', icon: '💾', details: 'Investigate connection pooling limits.' },
//         { id: '4', label: 'Max Connections?', icon: '📈', details: 'Investigate connection pooling limits.' },
//         { id: '5', label: 'Query Delays', icon: '⏱', details: 'Investigate connection pooling limits.' },
//     ],
//     links: [
//         { source: '1', target: '2' },
//         { source: '2', target: '4' },
//         { source: '1', target: '3' },
//         { source: '3', target: '5' },
//     ],
// };

const TreeDiagram3 = ({data}) => {
    const svgRef = useRef();
    const [selectedNode, setSelectedNode] = useState(null); // State to store clicked node data
    const [isPopupVisible, setPopupVisible] = useState(false);

    console.log("state", selectedNode)
    useEffect(() => {
        const margin = { top: 60, right: 20, bottom: 200, left: 20 }; // Add top margin for the root node
        const width = 770;
        const height = 800;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#f8f9fa')
            .attr('transform', `translate(${margin.left},${0})`);

        // Create tooltip div
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background', 'rgba(0, 0, 0, 0.7)')
            .style('color', 'white')
            .style('padding', '8px')
            .style('border-radius', '4px')
            .style('pointer-events', 'none')
            .style('opacity', 0);


        // Define highlighted edges
        const highlightedEdges = new Set(data.highlightedLinks);

        // Create a hierarchy from the nodes and links
        const root = d3.stratify()
            .id(d => d.id)
            .parentId(d => {
                const link = data.links.find(l => l.target === d.id);
                return link ? link.source : null;
            })(data.nodes);

        // Use tree layout to compute positions
        const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.bottom]);
        treeLayout(root);

        const nodes = root.descendants();
        const links = root.links();

        // Adjust positions if root node is out of bounds
        const minY = Math.min(...nodes.map(d => d.y));
        const yOffset = minY < margin.top ? margin.top - minY : 0;

        nodes.forEach(node => {
            node.y += yOffset; // Ensure root node is visible
        });
        

        // Create links
        const link = svg.append('g')
            .attr('class', 'links')
            .selectAll('path')
            .data(links)
            .join('path')
            .attr('fill', 'none')
            .attr('stroke', (d) => {
                const edgeKey = `${d.source.id}-${d.target.id}`;
                return highlightedEdges.has(edgeKey) ? 'green' : '#999';  // Highlighted edges in green
            })
            .attr('stroke-width', (d, i) => data.nodes.length * 1.1 - i * 1.1)
            .attr('stroke-linecap', 'round');

        // Create link labels for highlighted edges
        const linkLabels = svg.append('g')
            .attr('class', 'link-labels')
            .selectAll('g')
            .data(root.links())
            .join('g')
            .attr('class', 'link-label-group')
            .attr('transform', (d) => {
                const x = (d.source.x + d.target.x) / 2;
                const y = (d.source.y + d.target.y) / 2;
                return `translate(${x},${y})`;
            });

        // Add text for labels
        linkLabels.append('text')
            .attr('text-anchor', 'middle') // Center align text
            .attr('dy', '0.35em') // Vertically align text
            .style('font-size', '12px')
            .style('fill', 'blue') // Blue text color
            .text((d) => {
                const edgeKey = `${d.source.id}-${d.target.id}`;
                return highlightedEdges.has(edgeKey) ?  `${d.source.id} → ${d.target.id}` : ''; // Only add label to highlighted edges
            });


        // Create nodes
        const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .attr('transform', d => `translate(${d.x},${d.y})`);

        node.append('circle')
            .attr('r', 30)
            .attr('fill', d => {
                // Highlight nodes connected to highlighted edges
                const isHighlighted = highlightedEdges.has(`${d.parent?.id}-${d.id}`);
                return isHighlighted ? '#FFD700' : '#FAF9F6'; // Highlighted nodes in gold
            })
            .attr('stroke', '#D3D3D3')
            .attr('stroke-width', 2)
            .style('cursor', d => {
                const isLeaf = !d.children;
                const isConnectedToHighlightedEdge = highlightedEdges.has(`${d.parent?.id}-${d.id}`);
                return (isLeaf && isConnectedToHighlightedEdge) ? 'pointer' : 'default';
            })
            .on('mouseover', (event, d) => {
                tooltip.style('opacity', 1)
                    .html(`<strong>${d.data.label}</strong><br>${d.data.details}`);
            })
            .on('mousemove', (event) => {
                tooltip.style('top', `${event.pageY + 10}px`)
                    .style('left', `${event.pageX + 10}px`);
            })
            .on('mouseout', () => {
                tooltip.style('opacity', 0);
            })
            .on('click', (event, d) => {
                const isLeaf = !d.children;
                const isConnectedToHighlightedEdge = highlightedEdges.has(`${d.parent?.id}-${d.id}`);

                if (isLeaf && isConnectedToHighlightedEdge) {
                    setSelectedNode(d.data);
                    setPopupVisible(true);
                }
            });

        node.append('text')
            .attr('class', 'node-icon')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('fill', '#fff')
            .style('font-size', '20px')
            .text((d) => d.data.icon);

        node.append('text')
            .attr('class', 'node-label')
            // .attr('x', 40) // Position the label to the right of the circle
            .attr('x', d =>{
                return (d.children ? 40 : -40)}) 
            .attr('y', d =>{
                return (d.children ? 10 : 45)}) // Center align vertically with the node
            .attr('fill', '#333')
            .style('font-size', '14px')
            .text((d) => d.data.label);


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

      
    }, []);

    return <div style={{padding: '20px'}}>
    <svg ref={svgRef}></svg>
        <Portal
            isOpen={isPopupVisible}
            onClose={() => setPopupVisible(false)}
        >
            <span>{selectedNode?.icon}</span>
            <h1>{selectedNode?.label}</h1>
            <p>{selectedNode?.p}</p>
        </Portal>
    </div>;
};

export default TreeDiagram3;
