// utils.ts
import { RowData, Column } from "@/types";

export const sortData = (
  data: RowData[],
  key: keyof RowData,
  direction: "asc" | "desc"
): RowData[] => {
  return [...data].sort((a, b) => {
    if (a[key] < b[key]) {
      return direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};

export const reorderColumns = (
  columns: Column[],
  fromIndex: number,
  toIndex: number
): Column[] => {
  const reorderedColumns = [...columns];
  const [removed] = reorderedColumns.splice(fromIndex, 1);
  reorderedColumns.splice(toIndex, 0, removed);
  return reorderedColumns;
};
