import React from "react";
import { fetchCar } from "../actions";
import CarDocuments from "@/components/custom/CarDocuments";

type Props = {
  params: {
    id: string;
  };
};

const Page: React.FC<Props> = async ({ params }) => {
  const car = await fetchCar(params.id);
  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="text-5xl text-center mt-4 mb-10">{car.plate_number}</h2>
      <CarDocuments car={car} />
    </div>
  );
};

export default Page;
