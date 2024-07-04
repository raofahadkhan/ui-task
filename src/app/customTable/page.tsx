import React from "react";
import DynamicTable from "@/components/MyTable/MyTable";
import { Column } from "@/types";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const App: React.FC = () => {
  const data: User[] = [
    { id: 1, name: "John Doe", age: 35, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 42, email: "jane@example.com" },
    { id: 3, name: "Alex Johnson", age: 29, email: "alex@example.com" },
  ];

  const columns: Column<User>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
  ];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">UI TASK GIVEN BY VICTOR</h1>
      <DynamicTable initialData={data} initialColumns={columns} isFilterRowVisible={false} />
    </main>
  );
};

export default App;
