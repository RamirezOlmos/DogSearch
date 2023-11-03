"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          name,
          email,
        },
        {
          withCredentials: true,
        }
      );
      if (res) {
        toast.success("We hope you find your best friend!");
        setTimeout(() => router.push("/dogs"), 1000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status == 400)
          toast.error("Check your email please.");
        else {
          toast.error(error.message);
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <section>
      <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        <div className="w-full">
          <Button
            className="w-full bg-amber-600 hover:bg-orange-600 text-base"
            size="lg"
          >
            Login
          </Button>
          <Toaster position="top-right" />
        </div>
      </form>
    </section>
  );
};
