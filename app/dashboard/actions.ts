"use server";

import connectDB from "@/db/db";
import Car, { ICar } from "@/models/Car";
import moment from "moment";
import { MongooseError } from "mongoose";
import { revalidatePath } from "next/cache";

interface MongoDBError extends Error {
  code?: number; // Optional, since not all errors will have a code
  keyValue?: Record<string, unknown>; // Object for key-value pairs causing the error
}

export const fetchCars = async (): Promise<ICar[]> => {
  try {
    await connectDB();
    const data = await Car.find({});
    revalidatePath("/dashboard");

    return data.map((car) => {
      const createdAt = moment(car.createdAt).format("DD/MM/YYYY");
      const updatedAt = moment(car.updatedAt).format("DD/MM/YYYY");

      console.log(createdAt);

      return {
        plate_number: car.plate_number,
        createdAt,
        updatedAt,
        id: car._id,
        documents: car.documents,
        enabled: car.enabled,
      };
    }) as unknown as ICar[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCar = async (id: string): Promise<ICar> => {
  try {
    await connectDB();
    const result = await Car.findById(id);
    if (!result) {
      throw new Error("Operatiune nereusita");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Operatiune nereusita");
  }
};

export const deleteCar = async (id: string) => {
  try {
    await connectDB();
    const result = await Car.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Nu a putut fi gasit");
    }
    revalidatePath("/dashboard");
    return { message: "Operatiune reusita" };
  } catch (error) {
    console.log(error);
    throw new Error("Operatiune nereusita");
  }
};

export async function createCar(data: { plate_number: string }) {
  try {
    await connectDB();

    const newCar = new Car(data);
    await newCar.save();
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error creating car:", error);
    // Create a user-friendly message
    let errorMessage = "Ceva nu a mers bine";
    if ((error as MongoDBError).code === 11000) {
      errorMessage = "Nr de inmatriculare este folosit";
    }

    return { success: false, message: errorMessage };
  }
}

export async function updateCar(plate_number: string, data: Partial<ICar>) {
  try {
    await connectDB();

    const result = await Car.findOneAndUpdate(
      { plate_number },
      { documents: data }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Nu au fost actualizate documente");
    } else {
      console.log("Document actualizat cu succes:", result);
      revalidatePath("/dashboard");
      return { message: "Document actualizat cu succes" };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Nu au fost actualizate documente");
  }
}

export async function activateCar(plate_number: string, data: boolean) {
  try {
    await connectDB();

    const result = await Car.findOneAndUpdate(
      { plate_number },
      { enabled: data }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Nu au fost actualizate documente");
    } else {
      console.log("Document actualizat cu succes:", result);
      revalidatePath("/dashboard");
      return { message: "Document actualizat cu succes" };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Nu au fost actualizate documente");
  }
}
