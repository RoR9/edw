"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { RHFDatePicker } from "../rhf/RHFDatePicker";
import { useEffect, useMemo } from "react";
import { ICar } from "@/models/Car";
import { toast } from "sonner";
import { updateCar } from "@/app/dashboard/actions";
import { diffDays } from "@/lib/utils";
import { useRouter } from "next/navigation";
import BadgeAlerts from "./BadgeAlerts";

type Props = {
  car: ICar;
};

const DocumentsTabs: React.FC<Props> = ({ car }) => {
  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();

  useEffect(() => {
    reset(car?.documents);
  }, [car?.documents, reset]);

  const vignetteExpiryDays = useMemo(() => {
    return diffDays(car.documents.vignette.expiry);
  }, [car.documents.vignette.expiry]);

  const inspectionExpiryDays = useMemo(() => {
    return diffDays(car.documents.inspection.expiry);
  }, [car.documents.inspection.expiry]);

  const insuranceExpiryDays = useMemo(() => {
    return diffDays(car.documents.insurance.expiry);
  }, [car.documents.insurance.expiry]);

  const onSubmit = async (data: Partial<ICar>) => {
    try {
      const result = await updateCar(car.plate_number, data);
      toast.success(result.message);
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
    console.log("submit");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs defaultValue="inspection" className="mx-auto max-w-[650px] w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="inspection"
            className="data-[state=active]:bg-black data-[state=active]:text-white flex gap-1"
          >
            <BadgeAlerts daysToExpire={inspectionExpiryDays} />
            <span>Revizia Tehnica</span>
          </TabsTrigger>
          <TabsTrigger
            value="insurance"
            className="data-[state=active]:bg-black data-[state=active]:text-white flex gap-1"
          >
            <BadgeAlerts daysToExpire={insuranceExpiryDays} />
            <span>Asigurare</span>
          </TabsTrigger>
          <TabsTrigger
            value="vignette"
            className="data-[state=active]:bg-black data-[state=active]:text-white flex gap-1"
          >
            <BadgeAlerts daysToExpire={vignetteExpiryDays} />
            <span>Rovineta</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inspection">
          <Card>
            <CardHeader>
              <CardTitle>Revizia Tehnica</CardTitle>
              <CardDescription>
                Faceți modificările aici. Faceți clic pe Salvați când terminati.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 flex flex-col">
                <Label htmlFor="inspection.issue">Data emiterii</Label>
                <RHFDatePicker control={control} name="inspection.issue" />
              </div>
              <div className="space-y-1 flex flex-col">
                <Label htmlFor="inspection.expiry">Data expirarii</Label>
                <RHFDatePicker control={control} name="inspection.expiry" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Salvare</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Asigurare</CardTitle>
              <CardDescription>
                Faceți modificările aici. Faceți clic pe Salvați când terminati.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 flex flex-col">
                <Label htmlFor="insurance.issue">Data emiterii</Label>
                <RHFDatePicker control={control} name="insurance.issue" />
              </div>
              <div className="space-y-1 flex flex-col">
                <Label htmlFor="insurance.expiry">Data expirarii</Label>
                <RHFDatePicker control={control} name="insurance.expiry" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Salvare</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="vignette">
          <Card>
            <CardHeader>
              <CardTitle>Rovineta</CardTitle>
              <CardDescription>
                Faceți modificările aici. Faceți clic pe Salvați când terminati.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 flex flex-col">
                <Label htmlFor="current">Data emiterii</Label>
                <RHFDatePicker control={control} name="vignette.issue" />
              </div>
              <div className="space-y-1 flex flex-col">
                <Label htmlFor="new">Data expirarii</Label>
                <RHFDatePicker control={control} name="vignette.expiry" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Salvare</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default DocumentsTabs;
