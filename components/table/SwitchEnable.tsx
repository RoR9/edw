"use client";
import React, { useRef, useState } from "react";
import { Switch } from "../ui/switch";
import { activateCar } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";
import LoaderModal from "../custom/LoaderModal";

type Props = {
  isInitialChecked: boolean;
  plateNumber: string;
};

const LOADER_TIME_MS = 700;

const SwitchEnable: React.FC<Props> = ({ isInitialChecked, plateNumber }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingStartTimeRef = useRef<number | null>(null);

  const handleChange = async (isCheck: boolean) => {
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, LOADER_TIME_MS);
    loadingStartTimeRef.current = Date.now();
    try {
      await activateCar(plateNumber, isCheck);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const elapsedTime = Date.now() - (loadingStartTimeRef.current || 0);
      if (elapsedTime < LOADER_TIME_MS) {
        setTimeout(() => setIsLoading(false), LOADER_TIME_MS - elapsedTime);
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && <LoaderModal />}
      <Switch
        defaultChecked={isInitialChecked}
        checked={isInitialChecked}
        onCheckedChange={handleChange}
      />
    </>
  );
};

export default SwitchEnable;
