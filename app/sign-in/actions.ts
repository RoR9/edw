"use server";

import connectDB from "@/db/db";
import { LoginFormSchema } from "../_lib/definitions";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import { NextResponse, NextRequest } from "next/server";
import { decrypt, encrypt } from "@/lib/utils";

export async function signin(formData: FormData) {
  await connectDB();
  const validationResult = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        errors: { email: "Email or password is incorrect" },
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        errors: { password: ["Email or password is incorrect"] },
      };
    }
    const expires = new Date(Date.now() + 3600 * 1000);
    const session = await encrypt({ email, expires });

    cookies().set("session", session, { expires, httpOnly: true });
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      errors: { general: ["Something went wrong"] }, // Handle password or email incorect
    };
  }
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  if (parsed) {
    parsed.expires = new Date(Date.now() + 120 * 1000);

    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires as Date,
    });

    return res;
  }
}

export async function protectRoutes(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  // Check if the user is logged in
  if (session && ["/sign-in", "/sign-up"].includes(pathname)) {
    // Redirect authenticated users trying to access login/signup
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check if the user is not logged in and trying to access protected routes
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}
