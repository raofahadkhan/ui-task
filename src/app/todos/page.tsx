"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/MyTable/MyTable";
import { Column } from "@/types";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [isFilterRowVisible, setIsFilterRowVisible] = useState(false);

  const columns: Column<Todo>[] = [
    { key: "userId", label: "User ID" },
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "completed", label: "Completed" },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const toggleFilterRow = () => {
    setIsFilterRowVisible(!isFilterRowVisible);
  };

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Custom Table</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          onClick={toggleFilterRow}
        >
          {isFilterRowVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      {data.length > 0 ? (
        <DynamicTable
          initialData={data}
          initialColumns={columns}
          isFilterRowVisible={isFilterRowVisible}
        />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default App;
