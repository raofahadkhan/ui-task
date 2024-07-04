"use client";

import React, { useState } from "react";

interface RowData {
  id: number;
  name: string;
  age: number;
  email: string;
}

interface Column {
  key: keyof RowData;
  label: string;
  direction?: "asc" | "desc";
}

const MyTable: React.FC = () => {
  const [data, setData] = useState<RowData[]>([
    { id: 1, name: "John Doe", age: 35, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 42, email: "jane@example.com" },
    { id: 3, name: "Alex Johnson", age: 29, email: "alex@example.com" },
  ]);

  const [columns, setColumns] = useState<Column[]>([
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
  ]);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof RowData | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  const [draggingColumnIndex, setDraggingColumnIndex] = useState<number | null>(
    null
  );
  const [draggingOverColumnIndex, setDraggingOverColumnIndex] = useState<
    number | null
  >(null);

  const handleDelete = (id: number): void => {
    const newData = data.filter((row) => row.id !== id);
    setData(newData);
  };

  const handleSort = (key: keyof RowData): void => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

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
      const reorderedColumns = [...columns];
      const [removed] = reorderedColumns.splice(draggingColumnIndex, 1);
      reorderedColumns.splice(draggingOverColumnIndex, 0, removed);

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
              <th
                key={column.key}
                className="py-2 px-4 border-b cursor-pointer text-center"
                draggable
                onClick={() => handleSort(column.key)}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => {
                  e.preventDefault(); // Allow drop
                  handleDragOver(index);
                }}
                onDrop={handleDrop}
                onDragEnd={handleDrop}
              >
                {column.label}
              </th>
            ))}
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.key}`}
                  className="py-2 px-4 border-b text-center"
                >
                  {row[column.key]}
                </td>
              ))}
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable;
