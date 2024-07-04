"use client";

import React from "react";
import { Column } from "@/types";
import { useTable } from '@/hooks/useTable';
import ColumnHeader from "./ColumnHeader";
import TableBody from "./TableBody";

interface DynamicTableProps<T extends { id: number }> {
  initialData: T[];
  initialColumns: Column<T>[];
  isFilterRowVisible: boolean;
}

const DynamicTable = <T extends { id: number }>({
  initialData,
  initialColumns,
  isFilterRowVisible,
}: DynamicTableProps<T>) => {
  const {
    data,
    columns,
    handleDelete,
    handleEdit,
    handleSort,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleFilterChange,
    filterValues
  } = useTable<T>(initialData, initialColumns);

  return (
    <div className="overflow-x-auto h-[80vh] border border-gray-200 relative">
      <table className="min-w-full bg-white border-collapse ">
        <thead className="sticky top-[0px] z-30 bg-gray-200">
          <tr className="">
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
                <th
                  key={`filter-${column.key.toString()}`}
                  className="py-2 px-4 border-b w-1/4"
                >
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Filter by ${column.label}`}
                    value={filterValues[column.key] || ""}
                    onChange={(e) =>
                      handleFilterChange(column.key, e.target.value)
                    }
                  />
                </th>
              ))}
              <th className="py-2 px-4 border-b text-center w-1/4"></th>
            </tr>
          )}
        </thead>
        <TableBody
          data={data}
          columns={columns}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </table>
    </div>
  );
};

export default DynamicTable;
