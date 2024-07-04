// TableBody.tsx
import React from "react";
import { RowData, Column } from "@/types";

interface TableBodyProps {
  data: RowData[];
  columns: Column[];
  onDelete: (id: number) => void;
}

const TableBody: React.FC<TableBodyProps> = ({ data, columns, onDelete }) => {
  return (
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
