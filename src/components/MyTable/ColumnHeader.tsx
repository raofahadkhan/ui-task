import React from 'react';
import { Column } from '@/types';

interface ColumnHeaderProps<T> {
  column: Column<T>;
  index: number;
  onSort: (key: keyof T) => void;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDrop: () => void;
  className?: string; // Add className prop
}

const ColumnHeader = <T,>({ column, index, onSort, onDragStart, onDragOver, onDrop, className }: ColumnHeaderProps<T>) => {
  return (
    <th
      key={column.key.toString()}
      className={`py-2 px-4 border-b cursor-pointer text-center ${className}`} // Apply className
      draggable
      onClick={() => onSort(column.key)}
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => {
        e.preventDefault(); // Allow drop
        onDragOver(index);
      }}
      onDrop={onDrop}
      onDragEnd={onDrop}
    >
      {column.label}
    </th>
  );
};

export default ColumnHeader;
