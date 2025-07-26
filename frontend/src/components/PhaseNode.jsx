import React from 'react';
import { Handle, Position } from '@xyflow/react';

const PhaseNode = ({ data }) => {
  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-lg p-4 shadow-lg border-2 border-purple-500 w-80 text-white">
      <Handle type="target" position={Position.Top} className="!bg-purple-500" />
      <div>
        <h3 className="text-lg font-bold text-purple-400 mb-3">{data.label}</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-200">
          {data.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        {data.suggestion && (
          <p className="text-gray-300 italic mt-3">
            <span className="font-semibold text-purple-300">Suggestion:</span> {data.suggestion}
          </p>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
    </div>
  );
};

export default PhaseNode;

