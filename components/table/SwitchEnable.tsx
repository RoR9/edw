"use client";
import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { activateCar } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";

type Props = {
  isInitialChecked: boolean;
  plateNumber: string;
};

const SwitchEnable: React.FC<Props> = ({ isInitialChecked, plateNumber }) => {
  const router = useRouter();

  const handleChange = async (isCheck: boolean) => {
    try {
      await activateCar(plateNumber, isCheck);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Switch
      defaultChecked={isInitialChecked}
      checked={isInitialChecked}
      onCheckedChange={handleChange}
    />
  );
};

export default SwitchEnable;
