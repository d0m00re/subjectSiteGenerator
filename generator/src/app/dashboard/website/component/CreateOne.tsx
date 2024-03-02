"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from "@/components/ui/label";
import * as generateWebsiteNetwork from "@/network/generateWebsite/generateWebsite.network";
import { useSession } from 'next-auth/react'
import navigate from "@/components/navigate";
import toast from 'react-hot-toast';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import IconLoaderSpin from "@/components/CustomIcon/IconLoaderSpin";

const ValidateForm = z.object({
    title: z.string(),
    subject: z.string()
})

type TValidateForm = z.infer<typeof ValidateForm>;

function CreateOne() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TValidateForm>({
        resolver: zodResolver(ValidateForm),
    });

    const submitForm: SubmitHandler<TValidateForm> = (data) => {
        setIsLoading(true);
        generateWebsiteNetwork.generateOne({
            title: data.title,
            subject: data.subject,
            accessToken: session?.backendTokens?.accessToken ?? ""
        })
            .then(resp => {
                navigate(`/dashboard/website/${resp.id}`);
                setIsLoading(false);
                toast("Success");
            })
            .catch(err => {
                setIsLoading(false);
                toast("Error");
            })
    }

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
                        {isLoading ? <IconLoaderSpin /> : 
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