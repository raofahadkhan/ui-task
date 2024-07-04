import { useState } from "react";

export const useEditableCell = <T extends { id: number }>() => {
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editKey, setEditKey] = useState<keyof T | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const startEditing = (row: T, key: keyof T) => {
    setEditRowId(row.id);
    setEditKey(key);
    setEditValue(row[key]?.toString() || "");
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = (
    onEdit: (id: number, key: keyof T, value: string) => void
  ) => {
    if (editRowId !== null && editKey !== null) {
      onEdit(editRowId, editKey, editValue);
      resetEditState();
    }
  };

  const handleEditKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    onEdit: (id: number, key: keyof T, value: string) => void
  ) => {
    if (e.key === "Enter") {
      handleEditSave(onEdit);
    }
  };

  const resetEditState = () => {
    setEditRowId(null);
    setEditKey(null);
    setEditValue("");
  };

  return {
    editRowId,
    editKey,
    editValue,
    startEditing,
    handleEditChange,
    handleEditSave,
    handleEditKeyDown,
    resetEditState,
  };
};
