import nodemailer from "nodemailer";
import moment from "moment";
import Car, { IDocument } from "@/models/Car";
import { DailyEmailHtml } from "@/components/emails/DailyReport";
import connectDB from "@/db/db";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const recipients = [process.env.EMAIL_RECIPIENT, process.env.EMAIL_RECIPIENT2];
export interface ObjectCar {
  [plateNumber: string]: {
    [key: string]: number;
  };
}

async function sendExpirationEmail(carDetails: ObjectCar) {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_NAME,
      pass: process.env.APP_PASS,
    },
  });

  const emailHtml = await DailyEmailHtml({ objCar: carDetails });

  await transporter.sendMail({
    from: process.env.APP_NAME,
    to: recipients.join(","),
    subject: "Aviz de expirare",
    html: emailHtml,
  });
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  console.log("Checking for expiring documents...");

  try {
    await connectDB();
    const cars = await Car.find({
      enabled: true,
    });

    console.log(cars, "caretta");

    const today = moment();

    const objCar: ObjectCar = {};
    for (const car of cars) {
      const { documents } = car;

      for (const [key, document] of Object.entries(documents)) {
        const expiryDate = moment((document as IDocument).expiry);
        const daysToExpire = expiryDate.diff(today, "days");

        if (daysToExpire < 7 && daysToExpire >= 0) {
          objCar[car.plate_number] = {
            ...objCar[car.plate_number],
            [key]: daysToExpire,
          };
        }
      }
    }
    //If there is at least one car send the email
    if (Object.keys(objCar).length) {
      await sendExpirationEmail(objCar);
    }
  } catch (error) {
    console.error("Error during expiration check:", error);
  }

  return new Response("Checked for expiring documents", { status: 200 });
}
