"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from "@/components/ui/label";
import * as network from "@/network/generateWebsite.network";

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
    network.generateOne({
      subject : data.subject
    })
    .then(resp => {
      console.log("resp : ")
      console.log(resp)
    })
    .catch(err => {
      console.log("error")
      console.log(err)
    }) 
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-2 max-w-lg bg-cyan-500 border rounded-sm">
        <Label>Subject of your website</Label>
        <Input {...register("subject")}></Input>
        <Button type="submit">Generate</Button>
      </form>
      <div className="flex flex-row gap-4">
        <button onClick={() => network.getOne({id : 42})}>get one</button>
        <button onClick={() => network.generateOne({subject : "john"})}>generate one</button>
      </div>
    </main>
  );
}
