// app/api/cars/route.ts
import { fetchCars } from "@/app/dashboard/actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cars = await fetchCars();
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.error();
  }
}
