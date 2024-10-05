import { clsx, type ClassValue } from "clsx";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function diffDays(expiryDate: string | Date | null) {
  const today = moment();
  const expiryMoment = moment(expiryDate);

  const differenceInDays = expiryMoment.diff(today, "days");

  if (Number.isNaN(differenceInDays)) {
    return null;
  }

  return differenceInDays;
}

export function formatDays(count: number) {
  return count === 1 ? "1 zi" : `${count} zile`;
}

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("120 sec from now")
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error(error);
  }
}
