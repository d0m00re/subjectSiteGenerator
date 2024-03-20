"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Settings } from 'lucide-react';
type Props = {}
type Checked = DropdownMenuCheckboxItemProps["checked"]
const SignInButton = ({ }: Props) => {
    const { data: session } = useSession();
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    if (session && session.user)
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
                        <DropdownMenuItem>
                            <Link href="/api/auth/signout" className='flex w-full gap-4 ml-auto text-red-600'>
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
                href={"/api/auth/signin"}
                className="flex gap-4 ml-auto text-green-600"
            >
                Sign In
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