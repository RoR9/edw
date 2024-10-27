"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { signin } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { longFormatters } from "date-fns";

interface FormDataType {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key as keyof FormDataType]);
    });

    try {
      setIsLoading(true);
      const response = await signin(data);

      if (response.errors) {
        toast.error("Verifica emailul sau parola");
        console.log("Errors:", response.errors);
      } else {
        router.replace("/dashboard");
        toast.success("Logat cu success");
        console.log("Log in", response.success);
      }
    } catch (error) {
      console.error("Signin error:", error);
      toast.error("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="flex flex-col gap-4 max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Parola</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">
          {isLoading ? (
            <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            "Logare"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Page;
