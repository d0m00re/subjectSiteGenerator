"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from "@/components/ui/label";

const ValidateForm = z.object({
  subject : z.string()
})

type TValidateForm = z.infer<typeof ValidateForm>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TValidateForm>({
    resolver: zodResolver(ValidateForm),
  });

  const submitForm : SubmitHandler<TValidateForm> = (data) => {
    console.log("submit form")
    console.log(data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-2 max-w-lg bg-cyan-500 border rounded-sm">
        <Label>Subject of your website</Label>
        <Input {...register("subject")}></Input>
        <Button type="submit">Generate</Button>
      </form>
    </main>
  );
}
