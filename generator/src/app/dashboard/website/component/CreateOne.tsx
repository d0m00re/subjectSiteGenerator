"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from "@/components/ui/label";
import * as network from "@/network/generateWebsite.network";
import { useSession } from 'next-auth/react'
import { redirect } from "next/dist/server/api-utils";
import navigate from "@/components/navigate";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { LoaderIcon } from "lucide-react";

const ValidateForm = z.object({
    title: z.string(),
    subject: z.string()
})

type TValidateForm = z.infer<typeof ValidateForm>;

function LoaderIconH() {
    return <LoaderIcon className="animate-spin" />
}

function CreateOne() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        network.generateOne({
            title: data.title,
            subject: data.subject,
            accessToken: session?.backendTokens?.accessToken ?? ""
        })
            .then(resp => {
                console.log("generate one : ")
                console.log(resp.id)
                navigate(`/dashboard/website/${resp.id}`);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("error")
                console.log(err);
                setIsLoading(false);
            })
    }

//<LoaderIcon className="animate-spin" />
    return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger onClick={onOpen}>Generate a website</DialogTrigger>
                <DialogContent>
                    <DialogHeader >
                        <DialogTitle>
                            Generate your website
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex flex-col gap-4 items-center">
                        {isLoading ? <LoaderIconH /> : 
                        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-2 max-w-lg p-4">
                            <Label className="text-2xl text-black">Title</Label>
                            <Input {...register("title")}></Input>

                            <Label className="text-2xl text-black">Description</Label>
                            <Input {...register("subject")}></Input>

                            <Button type="submit" className="mt-4">Generate</Button>
                        </form>
                        }
                    </DialogDescription>
                </DialogContent>
            </Dialog>
    )
}

export default CreateOne