import { type MRT_ColumnDef } from "material-react-table";

export interface Person {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
}

export interface Headers {
  accessorKey: string;
  header: string;
}

export interface ColumnOrderingTablePropType {
  columnsHeaders: MRT_ColumnDef<Person>[];
  data: Person[];
}

export interface Post {
  userId: number;
  id: number;
  title: number;
  completed: boolean;
}
