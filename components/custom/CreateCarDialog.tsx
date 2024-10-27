"use client";
import { createCar } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MongooseError } from "mongoose";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function CreateCarDialog() {
  const [plateNumber, setPlateNumber] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the server action directly
      await createCar({ plate_number: plateNumber });
      toast.success("Vehiculul este adaugat cu sucess!");
      setIsDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.log("Error creating car:", error);
      toast.error((error as MongooseError).message);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-4"
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
        >
          Adauga masina
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adauga masina</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plate_number" className="text-right">
                Nr de inmatriculare
              </Label>
              <Input
                id="plate_number"
                className="col-span-3"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salveaza</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
