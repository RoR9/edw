import nodemailer from "nodemailer";
import moment from "moment";
import Car, { IDocument } from "@/models/Car";
import { DailyEmailHtml } from "@/components/emails/DailyReport";

export const dynamic = "force-dynamic";
export interface ObjectCar {
  [plateNumber: string]: {
    [key: string]: number;
  };
}

async function sendExpirationEmail(carDetails: ObjectCar) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.APP_NAME,
      pass: process.env.APP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.APP_NAME,
    to: process.env.EMAIL_RECIPIENT,
    subject: "Aviz de expirare",
    text: `test`,
  });
}

export async function POST() {
  console.log("Checking for expiring documents...");

  try {
    sendExpirationEmail({});

    //   const cars = await Car.find({
    //     enabled: true,
    //   });

    //   console.log(cars, "caretta");

    //   const today = moment();

    //   const objCar: ObjectCar = {};
    //   for (const car of cars) {
    //     const { documents } = car;

    //     for (const [key, document] of Object.entries(documents)) {
    //       const expiryDate = moment((document as IDocument).expiry);
    //       const daysToExpire = expiryDate.diff(today, "days");

    //       if (daysToExpire < 7 && daysToExpire >= 0) {
    //         objCar[car.plate_number] = {
    //           ...objCar[car.plate_number],
    //           [key]: daysToExpire,
    //         };
    //       }
    //     }
    //   }
    //   //If there is at least one car send the email
    //   if (Object.keys(objCar).length) {
    //     sendExpirationEmail(objCar);
    //   }
  } catch (error) {
    console.error("Error during expiration check:", error);
  }

  return new Response("Checked for expiring documents", { status: 200 });
}
