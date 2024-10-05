"use client";
import { CreateCarDialog } from "@/components/custom/CreateCarDialog";
import { carColumns } from "@/components/table/columns";

import { DataTable } from "@/components/ui/data-table";

import React from "react";
import CheckExpiryButton from "@/components/custom/ExpiryButton";
import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {
  const {
    data: cars,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cars"], // Correctly structure the query key
    queryFn: async () => {
      const response = await fetch("/api/getCars"); // Adjust the path if needed
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cars: {error.message}</div>;
  }

  return (
    <div className="flex p-20 h-full">
      <div className="max-w-screen-xl mx-auto w-full">
        <h1 className="text-5xl mb-10">Dashboard</h1>
        <CreateCarDialog />
        <DataTable columns={carColumns} data={cars} />
        <CheckExpiryButton />
      </div>
    </div>
  );
};

export default DashboardPage;
