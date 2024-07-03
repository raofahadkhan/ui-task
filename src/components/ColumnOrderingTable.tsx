import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { ColumnOrderingTablePropType, type Person } from "@/types";

const ColumnOrderingTable: React.FC<ColumnOrderingTablePropType> = ({
  columnsHeaders,
  data,
}) => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => columnsHeaders, []);

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true,
  });

  return <MaterialReactTable table={table} />;
};

export default ColumnOrderingTable;
