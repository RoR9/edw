"use client";
import React from "react";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Row } from "@tanstack/react-table";
import { ICar } from "@/models/Car";
import { useRouter } from "next/navigation";

type Props<T extends ICar> = {
  row: Row<T>;
};

const EditButton = <T extends ICar>({ row }: Props<T>) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => router.push(`dashboard/${row.original.id}`)}
      disabled={!row.original.enabled}
    >
      <Pencil />
    </Button>
  );
};

export default EditButton;
