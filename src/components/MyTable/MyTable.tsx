"use client";

import React, { useState, useEffect } from 'react';
import { Column } from '@/types';
import { sortData, reorderColumns } from '@/utils/MyTable';
import ColumnHeader from './ColumnHeader';
import TableBody from './TableBody';

interface DynamicTableProps<T extends { id: number }> {
  initialData: T[];
  initialColumns: Column<T>[];
  isFilterRowVisible: boolean;
}

const DynamicTable = <T extends { id: number }>({ initialData, initialColumns, isFilterRowVisible }: DynamicTableProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [columns, setColumns] = useState<Column<T>[]>(initialColumns);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'asc' | 'desc' | null }>({ key: null, direction: null });
  const [draggingColumnIndex, setDraggingColumnIndex] = useState<number | null>(null);
  const [draggingOverColumnIndex, setDraggingOverColumnIndex] = useState<number | null>(null);
  const [filterValues, setFilterValues] = useState<{ [key in keyof T]?: string }>({});
  const [originalData, setOriginalData] = useState<T[]>(initialData);

  useEffect(() => {
    const filteredData = originalData.filter((row) =>
      Object.keys(filterValues).every((filterKey) => {
        const filterValue = filterValues[filterKey as keyof T];
        if (filterValue) {
          return row[filterKey as keyof T]
            ?.toString()
            ?.toLowerCase()
            .includes(filterValue.toLowerCase());
        }
        return true;
      })
    );
    setData(filteredData);
  }, [filterValues, originalData]);

  const handleDelete = (id: number): void => {
    const newData = originalData.filter((row) => row.id !== id);
    setOriginalData(newData);
  };

  const handleEdit = (id: number, key: keyof T, value: string) => {
    const updatedData = originalData.map((row) =>
      row.id === id ? { ...row, [key]: value } : row
    );
    setOriginalData(updatedData);
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

  const handleFilterChange = (key: keyof T, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="overflow-x-auto h-[80vh]">
      <table className="min-w-full bg-white border border-gray-200 ">
        <thead className='sticky top-0 bg-white'>
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
                className="w-1/4"
              />
            ))}
            <th className="py-2 px-4 border-b text-center w-1/4">Actions</th>
          </tr>
          {isFilterRowVisible && (
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th key={`filter-${column.key.toString()}`} className="py-2 px-4 border-b w-1/4">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Filter by ${column.label}`}
                    value={filterValues[column.key] || ''}
                    onChange={(e) => handleFilterChange(column.key, e.target.value)}
                  />
                </th>
              ))}
              <th className="py-2 px-4 border-b text-center w-1/4"></th>
            </tr>
          )}
        </thead>
        <TableBody data={data} columns={columns} onDelete={handleDelete} onEdit={handleEdit} />
      </table>
    </div>
  );
};

export default DynamicTable;
