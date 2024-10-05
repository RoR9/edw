import React from "react";
import { Separator } from "../ui/separator";
import DocumentsTabs from "./DocumentsTabs";
import { ICar } from "@/models/Car";

type Props = {
  car: ICar;
};

const CarDocuments: React.FC<Props> = ({ car }) => {
  return (
    <div className="px-8">
      <h3 className="text-xl font-medium leading-none">Documente</h3>
      <Separator className="my-4" />
      <DocumentsTabs car={car} />
    </div>
  );
};

export default CarDocuments;
