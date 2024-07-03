"use client";
import ColumnOrderingTable from "@/components/ColumnOrderingTable";
import { data } from "@/data/tableData";
import { Person, Post } from "@/types";
import { useEffect, useState } from "react";

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
      header: "State",
    },
  ];

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetch("https://jsonplaceholder.typicode.com/todos");
      const parsedPosts = await posts.json();
      setPosts(parsedPosts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="w-[80%] mx-auto">
      <ColumnOrderingTable columnsHeaders={columnHeadings} data={data} />
      <br />
      <br />
      <br />
      <br />
      <ColumnOrderingTable
        columnsHeaders={columnHeadings}
        data={posts as unknown as Person[]}
      />
    </div>
  );
}
