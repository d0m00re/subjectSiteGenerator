"use client"

import { ReactNode } from "react";
import {SessionProvider} from "next-auth/react";

interface Props {
    children: ReactNode;
}

const ProviderNextAuth = ({children} : Props) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default ProviderNextAuth;