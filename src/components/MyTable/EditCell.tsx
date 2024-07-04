"use client";

import React from 'react';

interface EditCellProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const EditCell: React.FC<EditCellProps> = ({ value, onChange, onBlur, onKeyDown }) => {
  return (
    <input
      type="text"
      className="w-full border border-gray-300 rounded p-1"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
};

export default EditCell;
