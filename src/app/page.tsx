"use client";
import ColumnOrderingTable from "@/components/ColumnOrderingTable";
import { data } from "@/data/tableData";

export default function Home() {
  const columnHeadings = [
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
    {
      accessorKey: "state",
      enableColumnOrdering: false, //disable column ordering for this column,
      header: "State",
    },
  ];

  return (
    <div className="">
      <ColumnOrderingTable columnsHeaders={columnHeadings} data={data} />
    </div>
  );
}
