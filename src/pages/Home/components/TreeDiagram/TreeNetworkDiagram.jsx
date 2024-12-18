import React, { useCallback, useState } from "react";
// import ReactFlow, { ReactFlowProvider, addEdge, MiniMap, Controls } from "react-flow-renderer";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle,
    Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import './TreeDiagram.scss';
import CrossIcon from '../../../../assets/svg/crossIcon.svg'

const CustomNode = ({ data }) => {
    return (
        <div style={{
            background: "#f0f8ff",
        }}
            className="border"
        >
            <Handle type="target" position={Position.Top} />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <span style={{ fontSize: "16px" }}>{data.icon}</span>
                <span style={{ marginLeft: "10px", fontSize: "12px" }}>{data.label}</span>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </div>
    );
};

// Nodes and edges data
const data = {
    nodes: [
        { id: "1", type: "customNode", data: { label: "Main", icon: "🌐" }, position: { x: 250, y: 50 } },
        { id: "2", type: "customNode", data: { label: "Events", icon: "📢" }, position: { x: 450, y: 50 } },
        { id: "3", type: "customNode", data: { label: "services/reader.dart", icon: "🔧" }, position: { x: 150, y: 150 } },
        { id: "4", type: "customNode", data: { label: "services/generator.dart", icon: "🔧" }, position: { x: 350, y: 150 } },
        { id: "5", type: "customNode", data: { label: "generated-images", icon: "🗂" }, position: { x: 100, y: 250 } },
        { id: "6", type: "customNode", data: { label: "generate-image", icon: "⚙️" }, position: { x: 300, y: 250 } },
        { id: "7", type: "customNode", data: { label: "generate-story", icon: "⚙️" }, position: { x: 500, y: 250 } },
        { id: "8", type: "customNode", data: { label: "jobs/generate-image.dart", icon: "📄" }, position: { x: 100, y: 350 } },
        { id: "9", type: "customNode", data: { label: "jobs/generate-story.dart", icon: "📄" }, position: { x: 500, y: 350 } },
        { id: "10", type: "customNode", data: { label: "model_key", icon: "🔑" }, position: { x: 500, y: 450 } },
    ],

    edges: [
        {
            id: "e1-3", source: "1", target: "3", label: "routes1",
            style: { stroke: "#000", strokeWidth: 2 },
            labelBgStyle: { fill: "#fff", stroke: "#333", strokeWidth: 1.5 },
            labelBgPadding: [5, 5],
        },
        {
            id: "e1-4", source: "1", target: "4", label: "routes",
            style: { stroke: "#555", strokeWidth: 2, strokeDasharray: "5,5" },
        },
        {
            id: "e2-4", source: "2", target: "4", label: "triggers", animated: true,
            style: { stroke: "#0077ff", strokeWidth: 2 }
        },
        {
            id: "e3-5", source: "3", target: "5", label: "get, list", type: "straight",
            style: { stroke: "#ff9900", strokeWidth: 2 }
        },
        { id: "e3-6", source: "3", target: "6", label: "submit" },
        { id: "e4-7", source: "4", target: "7", label: "submit" },
        {
            id: "e5-8", source: "5", target: "8", label: "put",
            labelBgStyle: { fill: "#fff", stroke: "#333", strokeWidth: 1.5 },
            labelBgPadding: [5, 4],
        },
        { id: "e6-8", source: "6", target: "8", label: "runs on" },
        {
            id: "e6-9", source: "6", target: "9", label: "runs on second",
            labelStyle: { fill: "#000", fontSize: "12px", fontWeight: "bold", border: '1px solid pink' },
        },
        { id: "e7-9", source: "7", target: "9", label: "runs on" },
        {
            id: "e9-10", source: "9", target: "10", label: "access",
            labelBgStyle: {
                fill: "#33cc33",
                stroke: "#000",
                strokeWidth: 1,
                rx: 8, // Rounded corners
                ry: 8, // Rounded corners
            },
            labelBgPadding: [8, 10],
            style: { stroke: "#33cc33", strokeWidth: 2 },
        },
    ]
}

const nodeTypes = {
    customNode: CustomNode
};

export default function TreeNetworkDiagram() {
    const [nodes, setNodes, onNodesChange] = useNodesState(data?.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data?.edges);
    const [hiddenEdges, setHiddenEdges] = useState(new Set()); // To track hidden edges
    const [actionPopup, setActionPopup] = useState(null);
    const [newNodeId, setNewNodeId] = useState(11);


    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    // Handle edge click to hide the clicked edge
    const handleEdgeClick = (event, edge) => {
        event.stopPropagation(); // Prevent click propagation
        setHiddenEdges((prev) => new Set([...prev, edge.id]));
    };

    // Filter edges to exclude hidden ones
    const visibleEdges = edges.filter((edge) => !hiddenEdges.has(edge.id));


    const handleNodeClick = (event, node) => {
        console.log("node", event, node)
        event.stopPropagation(); // Prevent any unwanted propagation
        setActionPopup(node);
       
    };


    const addNewNode = (node) => {
        const parentId = node.id;
        const newNodePosition = {
            x: node.position.x - 100,
            y: node.position.y + 100
        }
        const newNode = { 
            id: `${newNodeId}`,
            type: 'customNode',
            data: {label: `New Node ${newNodeId}`, icon: '🌐'},
            position: newNodePosition
         };

        const newEdge = {
            id: 'e'+ parentId + '-' + newNodeId, 
            source: parentId, 
            target: newNodeId.toString(), 
            label: "new-node-link",
            style: { stroke: "gold", strokeWidth: 2 },
            labelBgStyle: { fill: "#fff", stroke: "#333", strokeWidth: 1.5 },
            labelBgPadding: [5, 5],
        }

        setNodes((prevNodes) => [...prevNodes, newNode]);
        setEdges((prevEdges) => [...prevEdges, newEdge]);

        setNewNodeId((id) => id + 1);
        setActionPopup(null);
    }

    const deleteNode = (nodeId) => {
        setNodes((prevNodes) => prevNodes.filter((n) => n.id !== nodeId));

        setEdges((prevEdges) =>
            prevEdges.filter(
                (edge) => edge.source !== nodeId && edge.target !== nodeId
            )
        );
        setActionPopup(null)
    }


    return (

        <div style={{ height: '80vh', width: '90%', border: '1px solid #E0E0E0', margin: '50px auto', borderRadius: '5px' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={visibleEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeClick={handleEdgeClick}
                onNodeClick={handleNodeClick}
                fitView
            >
                {/* <MiniMap /> */}
                <Controls />
                <Background />
            </ReactFlow>

            {actionPopup && (
                <div
                    style={{
                        position: "absolute",
                        top: actionPopup.position.y,
                        left: actionPopup.position.x,
                    }}
                    className="actionPopup__wrapper"
                >
                    <header>
                        <strong>{actionPopup.data.label}</strong>
                        <button 
                        onClick={() => setActionPopup(null)}
                        >
                            <img src={CrossIcon} alt="icon"/>
                        </button>
                    </header>

                    <div className="actionPopup__actionList">
                        <span onClick={() => addNewNode(actionPopup)}>Add New Node</span>
                        <span onClick={() => editNode(actionPopup.id)}>Edit Node</span>
                        <span onClick={() => deleteNode(actionPopup.id)}>Delete Node</span>
                    </div>
                </div>
            )}
        </div>

    );
};

