import React, { useMemo, useState, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ReactFlow, Background, Controls, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import PhaseNode from '../components/PhaseNode';

const nodeTypes = {
  phase: PhaseNode,
};

const handleSubmit = () =>{
  console.log("handleSubmit called");
}
const MapResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roadmap } = location.state || {};

  // Prepare initial nodes and edges from roadmap
  const { initialNodes, initialEdges } = useMemo(() => {
    if (!roadmap || !roadmap.phases) {
      return { initialNodes: [], initialEdges: [] };
    }

    const nodeWidth = 400; // width of a node (adjust as needed)
    const leftX = 0;
    const rightX = 500; // distance between left and right columns (adjust as needed)
    const yGap = 500; // vertical gap between nodes

    const nodes = roadmap.phases.map((phase, index) => ({
      id: `phase-${index + 1}`,
      type: 'phase',
      position: {
        x: index % 2 === 0 ? leftX : rightX,
        y: index * yGap,
      },
      data: {
        label: ` ${phase.title}`,
        steps: phase.steps,
        suggestion: phase.suggestion,
      },
      draggable: true, // <-- explicitly allow dragging
    }));

    const edges = roadmap.phases.slice(0, -1).map((_, index) => ({
      id: `e${index + 1}-${index + 2}`,
      source: `phase-${index + 1}`,
      target: `phase-${index + 2}`,
      animated: true,
      style: { stroke: '#8b5cf6' },
    }));

    return { initialNodes: nodes, initialEdges: edges };
  }, [roadmap]);
console.log("roadmap in map", roadmap)
  // Use state for nodes and edges to allow interaction
  const [nodes, setNodes] = useState(initialNodes);
  const [edges] = useState(initialEdges); // Edges remain fixed (order does not change)

  // Update node positions on drag
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  if (!roadmap) {
    // Handle case where user navigates directly or refreshes the page
    return (
      <div className="text-white text-center py-24 px-4">
        <h1 className="text-3xl font-bold mb-4">Roadmap not found</h1>
        <p className="mb-8">Please generate a new roadmap from the home page.</p>
        <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-white text-3xl sm:text-4xl font-bold my-4 text-center absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black bg-opacity-50 px-4 py-2 rounded">
        {roadmap.title}
      </h1>
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 right-8 z-20 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
      >
        Create New Roadmap
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        nodesDraggable={true}
        nodesConnectable={false}
        panOnDrag={true}
        onNodesChange={onNodesChange}
      >
        <Background color="#4a044e" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MapResult;

