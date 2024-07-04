"use client";

import React from "react";
import { Column } from "@/types";
import { FaPencilAlt } from "react-icons/fa";
import EditCell from "./EditCell";
import ActionCell from "./ActionCell";
import { useEditableCell } from "@/hooks/useEditableCell";

interface TableBodyProps<T extends { id: number }> {
  data: T[];
  columns: Column<T>[];
  onDelete: (id: number) => void;
  onEdit: (id: number, key: keyof T, value: string) => void;
}

const TableBody = <T extends { id: number }>({
  data,
  columns,
  onDelete,
  onEdit,
}: TableBodyProps<T>) => {
  const {
    editRowId,
    editKey,
    editValue,
    startEditing,
    handleEditChange,
    handleEditSave,
    handleEditKeyDown,
  } = useEditableCell<T>();

  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id} className="hover:bg-gray-100 cursor-pointer">
          {columns.map((column) => (
            <td
              key={`${row.id}-${column.key.toString()}`}
              className="py-2 px-4 border-b text-center relative group"
            >
              {editRowId === row.id && editKey === column.key ? (
                <EditCell
                  value={editValue}
                  onChange={handleEditChange}
                  onBlur={() => handleEditSave(onEdit)}
                  onKeyDown={(e) => handleEditKeyDown(e, onEdit)}
                />
              ) : (
                <>
                  <span>
                    {typeof row[column.key] === "boolean"
                      ? row[column.key]
                        ? "Yes"
                        : "No"
                      : (row[column.key] as React.ReactNode)}
                  </span>
                  <FaPencilAlt
                    className="absolute right-2 top-2 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => startEditing(row, column.key)}
                  />
                </>
              )}
            </td>
          ))}
          <td className="py-2 px-4 border-b text-center">
            <ActionCell onDelete={() => onDelete(row.id)} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
