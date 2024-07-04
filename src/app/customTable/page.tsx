"use client";
import MyTable from "@/components/MyTable/MyTable";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Custom Table</h1>
      <MyTable />
    </main>
  );
}
