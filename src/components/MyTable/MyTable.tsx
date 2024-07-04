"use client";

import React, { useState } from 'react';
import { Column } from '@/types';
import { sortData, reorderColumns } from '@/utils/MyTable';
import ColumnHeader from './ColumnHeader';
import TableBody from './TableBody';

interface DynamicTableProps<T extends { id: number }> {
  initialData: T[];
  initialColumns: Column<T>[];
}

const DynamicTable = <T extends { id: number }>({ initialData, initialColumns }: DynamicTableProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [columns, setColumns] = useState<Column<T>[]>(initialColumns);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'asc' | 'desc' | null }>({ key: null, direction: null });
  const [draggingColumnIndex, setDraggingColumnIndex] = useState<number | null>(null);
  const [draggingOverColumnIndex, setDraggingOverColumnIndex] = useState<number | null>(null);

  const handleDelete = (id: number): void => {
    const newData = data.filter((row) => row.id !== id);
    setData(newData);
  };

  const handleSort = (key: keyof T): void => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = sortData(data, key, direction);
    setData(sortedData);
  };

  const handleDragStart = (index: number) => {
    setDraggingColumnIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggingColumnIndex !== null && draggingColumnIndex !== index) {
      setDraggingOverColumnIndex(index);
    }
  };

  const handleDrop = () => {
    if (draggingColumnIndex !== null && draggingOverColumnIndex !== null) {
      const reorderedColumns = reorderColumns(columns, draggingColumnIndex, draggingOverColumnIndex);
      setColumns(reorderedColumns);
    }

    setDraggingColumnIndex(null);
    setDraggingOverColumnIndex(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <ColumnHeader
                key={column.key.toString()}
                column={column}
                index={index}
                onSort={handleSort}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))}
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <TableBody data={data} columns={columns} onDelete={handleDelete} />
      </table>
    </div>
  );
};

export default DynamicTable;
