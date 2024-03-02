import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import * as generateWebsiteNetwork from "@/network/generateWebsite/generateWebsite.network";
import useCurrentWebsite from "./currentWebsite.zustand.store";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';
import { A_I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';

const ValidateForm = z.object({
    title: z.string(),
    description: z.string()
})

type TValidateForm = z.infer<typeof ValidateForm>;

function LoaderIconH() {
    return <LoaderIcon className="animate-spin" />
}

interface IModalEdit {
    open: boolean;
    setOpen: (val: boolean) => void;
    section: A_I_WebsiteSection;
}

const ModalEditSection = (props: IModalEdit) => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const currentWebsite = useCurrentWebsite();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TValidateForm>({
        resolver: zodResolver(ValidateForm),
    });

    const submitForm: SubmitHandler<TValidateForm> = (data) => {
        setIsLoading(true);
        generateWebsiteNetwork.updateWebsiteSection({
            title: data.title,
            description: data.description,
            sectionId: props.section.id,
            accessToken: session?.backendTokens?.accessToken ?? ""
        })
            .then(resp => {
                console.log("success edit section")
                console.log(resp);
                currentWebsite.updateSection(resp);
            })
            .catch(err => {
                console.log("err modalEditSection : ", err);
            })
            .finally(() => {
                    setIsLoading(false);
                props.setOpen(false);
            })
    }

    useEffect(() => {
        setValue('title', props.section.title);
        setValue('description', props.section.description);
    }, [props])


    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent>
                <DialogHeader >
                    <DialogTitle>
                        Edit your section
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-col gap-4 items-center">
                    {!props.open ? <LoaderIconH /> :
                        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-2 max-w-lg p-4">
                            <Label className="text-2xl text-black">Title</Label>
                            <Input className='text-black' {...register("title")}></Input>

                            <Label className="text-2xl text-black">Description</Label>
                            <Textarea className='text-black' {...register("description")} />

                            {(isLoading === false) ?
                                <div className='flex flex-row justify-between'>
                                    <Button
                                        onClick={() => props.setOpen(false)}
                                        variant={"destructive"}
                                        className="mt-4"
                                    >
                                        Undo
                                    </Button>
                                    <Button type="submit" className="mt-4">
                                        Save
                                    </Button>
                                </div>
                                :
                                <div className='flex flex-row justify-center'>
                                    <IconLoaderSpin />
                                </div>
                            }
                        </form>
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog >
    )
}

export default ModalEditSection;