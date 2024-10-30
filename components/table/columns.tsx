"use client";
import { ICar } from "@/models/Car";
import { ColumnDef } from "@tanstack/react-table";
import DeleteDialog from "../custom/DeleteDialog";
import { deleteCar } from "@/app/dashboard/actions";
import BadgeAlerts from "../custom/BadgeAlerts";
import { cn, diffDays } from "@/lib/utils";
import EditButton from "./EditButton";
import { Badge } from "lucide-react";
import SwitchEnable from "./SwitchEnable";

export const carColumns: ColumnDef<ICar>[] = [
  {
    header: "Nr de inmatriculare",
    cell: ({ row }) => {
      return (
        <p
          className={cn({
            "text-muted-foreground": !row.original.enabled,
          })}
        >
          {row.original.plate_number}
        </p>
      );
    },
  },

  {
    id: "documents_inspection",
    header: "Revizia tehnica",
    cell: ({ row }) => {
      const daysInspectionExpiry = diffDays(
        row.original.documents?.inspection?.expiry
      );
      if (!row.original.enabled) return <Badge className="text-gray-500" />;
      return (
        <div className="flex gap-1.5 items-center">
          <BadgeAlerts daysToExpire={daysInspectionExpiry} />
          <p>{daysInspectionExpiry}</p>
        </div>
      );
    },
  },
  {
    id: "documents_insurance",
    header: "Asigurare",
    cell: ({ row }) => {
      const daysInsuranceExpiry = diffDays(
        row.original.documents?.insurance?.expiry
      );
      if (!row.original.enabled) return <Badge className="text-gray-500" />;
      return (
        <div className="flex gap-1.5 items-center">
          <BadgeAlerts daysToExpire={daysInsuranceExpiry} />
          <p>{daysInsuranceExpiry}</p>
        </div>
      );
    },
  },
  {
    id: "documents_vignette",
    header: "Rovineta",
    cell: ({ row }) => {
      const daysVignetteExpiry = diffDays(
        row.original.documents?.vignette?.expiry
      );
      if (!row.original.enabled) return <Badge className="text-gray-500" />;
      return (
        <div className="flex gap-1.5 items-center">
          <BadgeAlerts daysToExpire={daysVignetteExpiry} />
          <p>{daysVignetteExpiry}</p>
        </div>
      );
    },
  },
  {
    id: "edit",
    header: "Editare",
    cell: ({ row }) => {
      return <EditButton row={row} />;
    },
  },
  {
    id: "delete_action",
    header: "Sterge",
    cell: ({ row }) => {
      return (
        <DeleteDialog
          handleDeleteConfirm={deleteCar}
          itemId={row.original.id}
          isDisabled={!row.original.enabled}
        />
      );
    },
  },
  {
    id: "toggle_enabled",
    header: "Activ",
    cell: ({ row }) => {
      return (
        <SwitchEnable
          isInitialChecked={row.original.enabled}
          plateNumber={row.original.plate_number}
        />
      );
    },
  },
];
