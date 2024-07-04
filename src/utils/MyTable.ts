import { Column } from "@/types";

export const sortData = <T>(
  data: T[],
  key: keyof T,
  direction: "asc" | "desc"
): T[] => {
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

export const reorderColumns = <T>(
  columns: Column<T>[],
  fromIndex: number,
  toIndex: number
): Column<T>[] => {
  const reorderedColumns = [...columns];
  const [removed] = reorderedColumns.splice(fromIndex, 1);
  reorderedColumns.splice(toIndex, 0, removed);
  return reorderedColumns;
};
