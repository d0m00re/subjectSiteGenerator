import React, { useState } from 'react';
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { ISectionCreate } from '@/network/generateWebsite/generateWebsite.entity';

const ValidateForm = z.object({
    title: z.string(),
    description: z.string()
})

type TValidateForm = z.infer<typeof ValidateForm>;

function LoaderIconH() {
    return <LoaderIcon className="animate-spin" />
}

interface IModalCreateSection {
    open: boolean;
    order : number;
    websiteId : number;
    setOpen: (val: boolean) => void;
}

const ModalCreateSection = (props: IModalCreateSection) => {
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
        generateWebsiteNetwork.createWebsiteSection({
            title : data.title,
            description : data.description,
            order : props.order,
            websiteId : props.websiteId,
            accessToken : session?.backendTokens?.accessToken ?? ""
        })
        .then(resp => {
            console.log("inject some data :")
            console.log(resp);
            currentWebsite.resetWtData(resp); //.rese(resp);
        })
        .catch(err => {
            console.log("err modal create section : ", err)
        })
        .finally(() => {
            props.setOpen(false);
            setIsLoading(false);
        })
    }

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent>
                <DialogHeader >
                    <DialogTitle>
                        Create a new section
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

export default ModalCreateSection;