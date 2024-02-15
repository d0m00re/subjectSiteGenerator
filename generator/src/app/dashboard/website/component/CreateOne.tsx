"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from "@/components/ui/label";
import * as network from "@/network/generateWebsite.network";
import { useSession } from 'next-auth/react'

const ValidateForm = z.object({
    title: z.string(),
    subject: z.string()
})

type TValidateForm = z.infer<typeof ValidateForm>;
type Props = {}

function CreateOne({ }: Props) {
    const { data: session } = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TValidateForm>({
        resolver: zodResolver(ValidateForm),
    });

    const submitForm: SubmitHandler<TValidateForm> = (data) => {
        console.log("submit form")
        console.log(data);
        network.generateOne({
            title: data.title,
            subject: data.subject,
            accessToken: session?.backendTokens?.accessToken ?? ""
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
        <div className="flex flex-col bg-cyan-500 border rounded-sm p-4">
            <h1 className="text-2xl">Create your website</h1>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-2 max-w-lg p-4">
                <Label className="text-2xl">Title</Label>
                <Input {...register("title")}></Input>

                <Label className="text-2xl">Description</Label>
                <Input {...register("subject")}></Input>

                <Button type="submit">Generate</Button>
            </form>
        </div>
    )
}

export default CreateOne