import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import './TreeDiagram.scss';

const initialData = {
    nodes: [
        { id: '1', label: 'Login Failures', icon: '🔒', details: 'Possible login issues detected.' },
        { id: '2', label: 'DB Connectivity?', icon: '⛪', details: 'Check database connection settings.' },
        { id: '3', label: 'Pool Issues?', icon: '💾', details: 'Investigate connection pooling limits.' },
        { id: '4', label: 'Max Connections?', icon: '📈', details: 'Investigate connection pooling limits.' },
        { id: '5', label: 'Query Delays', icon: '⏱', details: 'Investigate connection pooling limits.' },
    ],
    links: [
        { source: '1', target: '2' },
        { source: '2', target: '4' },
        { source: '1', target: '3' },
        { source: '3', target: '5' },
    ],
};

export default function HorizontalTreeDiagram() {
    const svgRef = useRef();
    const [data, setData] = useState(initialData);
    const [newNodeId, setNewNodeId] = useState(6); // To track new node IDs dynamically
    const [popup, setPopup] = useState(null);
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);

    useEffect(() => {
        // 1. Set up the tree dimensions
        const width = 1000;
        const height = 800;
        const nodeSpacing = 100;

        // 2. Clear the SVG
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // 3. Set up the SVG canvas
        const svgGroup = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(80,${height / 2})`);

        // 4. Convert the data into a D3 hierarchy
        const root = d3
            .stratify()
            .id((d) => d.id)
            .parentId((d) => {
                const link = data.links.find((link) => link.target === d.id);
                return link ? link.source : null;
            })(data.nodes);

        // 5. Create a tree layout
        const treeLayout = d3.tree().nodeSize([nodeSpacing, 120]);
        treeLayout(root);

        // 6. Render links (paths)
        const links = svgGroup
            .selectAll(".link")
            .data(root.links())
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 2)
            .attr("d", d3.linkHorizontal().x((d) => d.y).y((d) => d.x))
            .style("cursor", "pointer")
            .on("click", function (_, d) {
                d3.select(this).style("display", "none"); // Hide link on click
            });

        // 7. Render nodes (circles)
        const node = svgGroup
            .selectAll(".node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", (d) => `translate(${d.y},${d.x})`)
            .style("cursor", "pointer")
            .on("click", (_, d) => {
                showPopup(d)
                // addNewNode(d.data.id); // Add new child node when node is clicked
            });

        // Add circles to the nodes
        node
            .append("circle")
            .attr("r", 20)
            .attr("fill", "#6a5acd")
            .attr("stroke", "#ddd")
            .attr("stroke-width", 2);

        // Add labels to the nodes
        node
            .append("text")
            .attr("dy", 4)
            .attr("x", (d) => (d.children ? -25 : 25))
            .attr("text-anchor", (d) => (d.children ? "end" : "start"))
            .text((d) => d.data.label)
            .style("font-size", "12px")
            .style("fill", "#333");
    }, [data]);

    // Function to show action popup near clicked node
    const showPopup = (node) => {
        setPopup({
            id: node.data.id,
            label: node.data.label,
            x: node.y + 150, // Adjust popup position horizontally
            y: node.x + 250, // Adjust popup position vertically
        });
    };

    // Function to add a new child node
    const addNewNode = (parentId) => {
        const newNode = { id: `${newNodeId}`, label: `New Node ${newNodeId}` };
        const newLink = { source: parentId, target: `${newNodeId}` };

        setData((prevData) => ({
            nodes: [...prevData.nodes, newNode],
            links: [...prevData.links, newLink],
        }));

        setNewNodeId((id) => id + 1);
        setPopup(null);
    };

    // Function to delete a node
    const deleteNode = (nodeId) => {
        setData((prevData) => {
            const filteredNodes = prevData.nodes.filter((node) => node.id !== nodeId);
            const filteredLinks = prevData.links.filter(
                (link) => link.source !== nodeId && link.target !== nodeId
            );
            return { nodes: filteredNodes, links: filteredLinks };
        });
        setPopup(null);
    };

    // Function to edit a node
    const editNode = (nodeId) => {
        const newLabel = prompt("Enter new label for the node:");
        if (newLabel) {
            setData((prevData) => ({
                nodes: prevData.nodes.map((node) =>
                    node.id === nodeId ? { ...node, label: newLabel } : node
                ),
                links: prevData.links,
            }));
        }
        setPopup(null);
    };

    return (
        <div style={{ position: "relative" }}>
            <svg ref={svgRef}></svg>

            {/* Action Popup */}
            {popup && (
                <div
                    style={{
                        position: "absolute",
                        top: popup.y,
                        left: popup.x,
                        backgroundColor: "white",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
                        borderRadius: "5px",
                        padding: "10px",
                        zIndex: 1000,
                       
                    }}
                >
                    <p style={{ margin: "0 0 5px" }}>
                        <strong>{popup.label}</strong>
                       
                    </p>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        cursor: 'pointer'
                    }}>
                    <span onClick={() => addNewNode(popup.id)}>Add New Node</span>
                    <span onClick={() => editNode(popup.id)}>Edit Node</span>
                    <span onClick={() => deleteNode(popup.id)}>Delete Node</span>
                    <button onClick={() => setPopup(null)}>X</button>
                    </div>
                </div>
            )}

        </div>
    );
}
