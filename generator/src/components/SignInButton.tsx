"use client"

import Link from 'next/link';
import React, {useState} from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import * as authNetwork from "./../network/auth.network";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import navigate from './navigate';
import { Button } from './ui/button';
import IconLoaderSpin from './CustomIcon/IconLoaderSpin';

type Props = {}
const SignInButton = ({ }: Props) => {
    const [load, setLoad] = useState(false);
    // logout request
        const logout = () => {
            setLoad(true);
            authNetwork
            .logout()
            .then(resp => {
                navigate("/login")
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => setLoad(false));
        }

        return (
            <div className="flex items-center gap-4 ml-auto">
                <Badge># Free tier</Badge>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className=' cursor-pointer'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                    <DropdownMenuItem className='flex flex-col gap-2'>
                            <Link href="/dashboard/account" className='flex w-full ml-auto'>
                                Account
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='flex flex-col gap-2'>
                            <Button onClick={logout} variant={"destructive"} className='flex w-full ml-auto'>
                                {(load) ? <IconLoaderSpin />
                                :
                                <>Sign Out</>
                                }
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
}

export default SignInButton