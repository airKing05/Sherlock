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


export default function FlowDiagram({data}) {
    const [nodes, setNodes, onNodesChange] = useNodesState(data?.answer?.data?.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data?.answer?.data?.edges);

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
