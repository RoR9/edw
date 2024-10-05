import { CreateCarDialog } from "@/components/custom/CreateCarDialog";
import { carColumns } from "@/components/table/columns";

import { DataTable } from "@/components/ui/data-table";

import React from "react";
import { fetchCars } from "./actions";
import CheckExpiryButton from "@/components/custom/ExpiryButton";

const Page = async () => {
  const cars = await fetchCars();
  console.log(cars);
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

export default Page;
