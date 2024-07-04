"use client";

import React, { useState } from 'react';
import { Column } from '@/types';
import { FaPencilAlt } from 'react-icons/fa';

interface TableBodyProps<T extends { id: number }> {
  data: T[];
  columns: Column<T>[];
  onDelete: (id: number) => void;
  onEdit: (id: number, key: keyof T, value: string) => void;
}

const TableBody = <T extends { id: number }>({ data, columns, onDelete, onEdit }: TableBodyProps<T>) => {
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editKey, setEditKey] = useState<keyof T | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = () => {
    if (editRowId !== null && editKey !== null) {
      onEdit(editRowId, editKey, editValue);
      setEditRowId(null);
      setEditKey(null);
      setEditValue('');
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
  };

  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <td key={`${row.id}-${column.key.toString()}`} className="py-2 px-4 border-b text-center relative group">
              {editRowId === row.id && editKey === column.key ? (
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-1"
                  value={editValue}
                  onChange={handleEditChange}
                  onBlur={handleEditSave}
                  onKeyPress={handleEditKeyPress}
                  autoFocus
                />
              ) : (
                <>
                  <span>{typeof row[column.key] === 'boolean' ? (row[column.key] ? 'Yes' : 'No') : row[column.key] as React.ReactNode}</span>
                  <FaPencilAlt
                    className="absolute right-2 top-2 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => {
                      setEditRowId(row.id);
                      setEditKey(column.key);
                      setEditValue(row[column.key]?.toString() || '');
                    }}
                  />
                </>
              )}
            </td>
          ))}
          <td className="py-2 px-4 border-b text-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => onDelete(row.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
