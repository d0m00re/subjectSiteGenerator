"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from "@/components/ui/label";
import * as generateWebsiteNetwork from "@/network/generateWebsite/generateWebsite.network";
import * as websiteNetwork from "@/network/website/website.network";
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
        getValues,
        formState: { errors },
    } = useForm<TValidateForm>({
        resolver: zodResolver(ValidateForm),
    });

    const submitForm: SubmitHandler<TValidateForm> = (data, event) => {
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

    const submitCreateWebsite = () => {
        let values = getValues();
        console.log("submit create website : " + JSON.stringify(values));
        websiteNetwork.createWebsite({
            accessToken : session?.backendTokens?.accessToken ?? "",
            title : values.title,
            subject : values.subject
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

                            <div className="flex flex-row gap-2">
                                <Button type="submit" name="generate" className="mt-4">Generate</Button>
                                <Button type="button" className="mt-4" onClick={submitCreateWebsite}>Create</Button>
                            </div>
                        </form>
                        }
                    </DialogDescription>
                </DialogContent>
            </Dialog>
    )
}

export default CreateOne