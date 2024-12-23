import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = {
    name: "Login Failures",
    children: [
        {
            name: "DB Connectivity?",
            children: [
                {
                    name: "Pool Issues?",
                    children: [
                        { name: "Max Connections?", children: [] },
                        { name: "Connection Leaks?", children: [] },
                    ],
                },
                { name: "Query Delays", children: [] },
            ],
        },
    ],
};

const TreeDiagram2 = () => {
    const svgRef = useRef();

    useEffect(() => {
        const width = 1200;
        const height = 800;

        // Create the SVG container
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", "#f8f9fa");

        // Tree Layout setup
        const root = d3.hierarchy(data); // Convert data to hierarchy
        const treeLayout = d3.tree().size([width - 200, height - 200]);
        treeLayout(root); // Apply tree layout to root data

        // Draw links (lines between nodes)
        const link = svg
            .selectAll(".link")
            .data(root.links())
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "#999")
            .attr("stroke-width", (d) => (d.source.depth === 0 ? 4 : d.source.depth === 1 ? 3 : 2)) // Gradually decreasing width
            .attr("d", d3.linkVertical().x((d) => d.x).y((d) => d.y));

        // Function to highlight path and add link labels
        const highlightPath = (startNodeName) => {
            const path = [];
            let currentNode = root;

            // Traverse the hierarchy to get the path from the start node to the target node
            const traversePath = (node, path) => {
                if (!node) return false;
                path.push(node);
                if (node.data.name === startNodeName) return true;
                for (let child of node.children) {
                    if (traversePath(child, path)) return true;
                }
                path.pop();
                return false;
            };

            traversePath(root, path);

            // Highlight the links in the path
            svg
                .selectAll(".link")
                .data(root.links())
                .filter((d) => path.includes(d.source) && path.includes(d.target))
                .attr("stroke", "red")
                .attr("stroke-width", 6); // Thicker red line for the highlighted path

            // Add labels only for the highlighted path links
            svg
                .selectAll(".linkLabel")
                .data(root.links())
                .enter()
                .append("text")
                .attr("class", "linkLabel")
                .attr("x", (d) => (d.source.x + d.target.x) / 2) // Position label at the middle of the link
                .attr("y", (d) => (d.source.y + d.target.y) / 2 - 10) // Adjust vertical positioning
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("fill", "red")
                .text((d) => d.source.data.name + " to " + d.target.data.name)
                .filter((d) => path.includes(d.source) && path.includes(d.target)); // Only label the links in the path
        };

        // Highlight the path starting from the root node to a specific node
        highlightPath("Max Connections?");

        // Draw nodes (circles and labels)
        const node = svg
            .selectAll(".node")
            .data(root.descendants()) // All nodes
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", (d) => `translate(${d.x},${d.y})`);

        // Add circles to the nodes
        node
            .append("circle")
            .attr("r", 20)
            .attr("fill", (d) => (d.depth === 0 ? "black" : "green"))
            .attr("stroke", "#fff");

        // Add text for each node (name of node placed beside)
        node
            .append("text")
            .attr("text-anchor", "left") // Align text to the left
            .attr("x", 25) // Position text to the right of the circle
            .attr("y", 5) // Adjust vertical alignment to center with the node
            .style("font-size", "14px")
            .style("fill", "#333")
            .text((d) => d.data.name);

        // Optional: Add icons inside the nodes (optional)
        node
            .append("text")
            .attr("text-anchor", "middle")
            .attr("y", 5) // Adjust vertical alignment for the icon
            .style("font-size", "16px")
            .style("fill", "#fff")
            .text((d) => {
                switch (d.data.name) {
                    case "Login Failures":
                        return "🔒";
                    case "DB Connectivity?":
                        return "🌐";
                    case "Pool Issues?":
                        return "💾";
                    case "Max Connections?":
                        return "📈";
                    case "Connection Leaks?":
                        return "🛠️";
                    case "Query Delays":
                        return "⏱";
                    default:
                        return "";
                }
            });
    }, []);

    return <svg ref={svgRef}></svg>;
};

export default TreeDiagram2;
