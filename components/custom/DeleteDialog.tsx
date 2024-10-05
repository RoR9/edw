"use client";
import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  handleDeleteConfirm: (id: string) => void;
  itemId: string;
  isDisabled: boolean;
};

const DeleteDialog: React.FC<Props> = ({
  handleDeleteConfirm,
  itemId,
  isDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await handleDeleteConfirm(itemId);
      toast.success("Operatiune reusita");
      router.refresh();
    } catch (error) {
      toast.error((error as Error)?.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          disabled={isDisabled}
        >
          <Trash2Icon className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <form onSubmit={handleDelete}>
          <DialogHeader>
            <DialogTitle>Ești absolut sigur?</DialogTitle>
            <DialogDescription>
              Această acțiune nu poate fi anulată.<br></br> Ești sigur că vrei
              să ștergi acest fișier ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
