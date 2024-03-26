"use client"

import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Props = {}
type Checked = DropdownMenuCheckboxItemProps["checked"]
const SignInButton = ({ }: Props) => {
  //  const { data: session } = useSession();
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    if(true)//if (session && session.user)
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
                            <Link href="/api/auth/signout" className='flex w-full ml-auto text-red-600'>
                                Sign Out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )

    return (
        <div className="flex gap-4 ml-auto items-center">
            <Link
                href={"/login"}
                className="flex gap-4 ml-auto text-green-600"
            >
                Login
            </Link>
            <Link
                href={"/signup"}
                className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded"
            >
                Sign Up
            </Link>
        </div>);
}

export default SignInButton