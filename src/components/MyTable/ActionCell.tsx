"use client";

import React from 'react';

interface ActionCellProps {
  onDelete: () => void;
}

const ActionCell: React.FC<ActionCellProps> = ({ onDelete }) => {
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
      onClick={onDelete}
    >
      Delete
    </button>
  );
};

export default ActionCell;
