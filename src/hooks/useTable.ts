import { useState, useEffect } from "react";
import { Column } from "@/types";
import { sortData, reorderColumns } from "@/utils/MyTable";

export const useTable = <T extends { id: number }>(
  initialData: T[],
  initialColumns: Column<T>[]
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [columns, setColumns] = useState<Column<T>[]>(initialColumns);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });
  const [draggingColumnIndex, setDraggingColumnIndex] = useState<number | null>(
    null
  );
  const [draggingOverColumnIndex, setDraggingOverColumnIndex] = useState<
    number | null
  >(null);
  const [filterValues, setFilterValues] = useState<{
    [key in keyof T]?: string;
  }>({});
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
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
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
      const reorderedColumns = reorderColumns(
        columns,
        draggingColumnIndex,
        draggingOverColumnIndex
      );
      setColumns(reorderedColumns);
    }

    setDraggingColumnIndex(null);
    setDraggingOverColumnIndex(null);
  };

  const handleFilterChange = (key: keyof T, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  return {
    data,
    columns,
    sortConfig,
    filterValues,
    handleDelete,
    handleEdit,
    handleSort,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleFilterChange,
  };
};
