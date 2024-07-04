import React from "react";
import { Column, RowData } from "@/types";

interface ColumnHeaderProps {
  column: Column;
  index: number;
  onSort: (key: keyof RowData) => void;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDrop: () => void;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  column,
  index,
  onSort,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <th
      key={column.key}
      className="py-2 px-4 border-b cursor-pointer text-center"
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
