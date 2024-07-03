import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { type Person } from "@/types";
import { data } from "../data/tableData";

const ColumnOrderingTable = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      //end
      {
        accessorKey: "state",
        enableColumnOrdering: false, //disable column ordering for this column,
        header: "State",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true,
  });

  return <MaterialReactTable table={table} />;
};

export default ColumnOrderingTable;
