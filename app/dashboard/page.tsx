"use client";
import { CreateCarDialog } from "@/components/custom/CreateCarDialog";
import { carColumns } from "@/components/table/columns";

import { DataTable } from "@/components/ui/data-table";

import React from "react";
import CheckExpiryButton from "@/components/custom/ExpiryButton";
import {
  QueryClient,
  useQuery,
  QueryClientProvider,
} from "@tanstack/react-query";
import DashboardPage from "@/modules/dashboard";

const queryClient = new QueryClient();

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardPage />
    </QueryClientProvider>
  );
};

export default Page;
