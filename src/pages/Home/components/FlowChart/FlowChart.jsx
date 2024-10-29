import React from 'react';
import '../Cards/Cards.scss';
import { useCallback } from 'react';
import AwsIcon from '../../../../assets/svg/awsIcon.svg'

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle
} from 'reactflow';

import 'reactflow/dist/style.css';
import CardLayout from '../../../../Layouts/CardLayout/CardLayout';

const CustomNode = ({ data }) => {
    return (
        <div style={{ width: '50px', height: '50px', position: 'relative', borderRadius: '100%', border: `5px solid ${data.background}`}}>
            {/* Handle on the left */}
            <Handle type="source" position={data.source} style={{ background: '#555' }} />
            <div style={{
                 color: '#000', 
                 fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                  }}>
                <img
                style={{
                  marginTop: '10px'     
                }}
                 src={AwsIcon} alt='aws icon'/>
                  </div>
            {/* <div style={{ width: '100%', height: '100%' }}></div> */}
            {/* Handle on the right */}
            <Handle type="target" position={data.target} style={{ background: '#555' }} />
        </div>
    );
};

const nodeTypes = { customNode: CustomNode };

const initialNodes = [
    { 
        id: '1', 
        position: { x: 150, y: 150 }, 
        data: { background: '#6A0DAD', source: 'right', target: 'right' }, 
        type: 'customNode'
     }, 
    { 
        id: '2', 
        position: { x: 350, y: 150 }, 
        data: { background: '#AD60CC', source: 'right', target: 'left' }, 
        type: 'customNode' 
    }, 
    { 
        id: '3', 
        position: { x: 550, y: 250 }, 
        data: { background: '#E099EB', source: 'left', target: 'left' }, 
        type: 'customNode' 
    },
    { 
        id: '4', 
        position: { x: 550, y: 150 }, 
        data: { background: '#E099EB', source: 'left', target: 'left' }, 
        type: 'customNode' 
    }, 
    { 
        id: '5', 
        position: { x: 550, y: 50 }, 
        data: { background: '#E099EB', source: 'left', target: 'left' }, 
        type: 'customNode' 
    }, 

];

const initialEdges = [
    { 
        id: 'e1-2', 
        source: '1', 
        target: '2', 
        type: 'bezier', 
        style: { stroke: '#AD60CC', strokeWidth: 3 },
        label: 'Edge 1-2',
        labelStyle: { fill: '#E099EB', fontWeight: 'bold', fontSize: '12px' },
     },
    { 
        id: 'e2-3', 
        source: '2', 
        target: '3', 
        type: 'bezier', 
        style: { stroke: '#E0E0E0', strokeWidth: 3 },
        label: 'Edge 2-3',
        labelStyle: { fill: '#E099EB', fontWeight: 'bold', fontSize: '12px' },
     },
    {
        id: 'e2-4', 
        source: '2', 
        target: '4', 
        type: 'bezier', 
        animated: true, 
        style: { stroke: '#E0E0E0', strokeWidth: 3 },
        label: 'Edge 2-4',
        labelStyle: { fill: '#E099EB', fontWeight: 'bold', fontSize: '12px' },
     },
    {
        id: 'e2-5', 
        source: '2', 
        target: '5', 
        type: 'bezier', 
        animated: true, 
        style: { stroke: '#E0E0E0', strokeWidth: 3 }, 
        label: 'Edge 2-5',
        labelStyle: { fill: '#E099EB', fontWeight: 'bold', fontSize: '12px' },
},
];

export default function FlowDiagram() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
      <CardLayout title="Flow Diagram">
          <div style={{ height: '300px' }}>
              <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
              >
                  <Controls />
                  {/* <MiniMap /> */}
                  {/* <Background variant="dots" gap={12} size={1} /> */}
              </ReactFlow>
          </div>
      </CardLayout>
  )
}
