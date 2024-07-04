"use client";

import React, { useState, useEffect } from 'react';
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
  const [filterValues, setFilterValues] = useState<{ [key in keyof T]?: string }>({});
  const [isFilterRowVisible, setIsFilterRowVisible] = useState(false);

  useEffect(() => {
    const filteredData = initialData.filter((row) =>
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
  }, [filterValues, initialData]);

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

  const handleFilterChange = (key: keyof T, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFilterRow = () => {
    setIsFilterRowVisible(!isFilterRowVisible);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Custom Table</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          onClick={toggleFilterRow}
        >
          {isFilterRowVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
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
          {isFilterRowVisible && (
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th key={`filter-${column.key.toString()}`} className="py-2 px-4 border-b">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Filter by ${column.label}`}
                    value={filterValues[column.key] || ''}
                    onChange={(e) => handleFilterChange(column.key, e.target.value)}
                  />
                </th>
              ))}
              <th className="py-2 px-4 border-b text-center"></th>
            </tr>
          )}
        </thead>
        <TableBody data={data} columns={columns} onDelete={handleDelete} />
      </table>
    </div>
  );
};

export default DynamicTable;
