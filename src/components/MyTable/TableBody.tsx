import React from 'react';
import { Column } from '@/types';

interface TableBodyProps<T extends { id: number }> {
  data: T[];
  columns: Column<T>[];
  onDelete: (id: number) => void;
}

const TableBody = <T extends { id: number }>({ data, columns, onDelete }: TableBodyProps<T>) => {
  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <td key={`${row.id}-${column.key.toString()}`} className="py-2 px-4 border-b text-center">
              {row[column.key] as React.ReactNode}
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
