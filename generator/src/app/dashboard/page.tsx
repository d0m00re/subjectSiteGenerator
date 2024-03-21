"use client"

import FileUpload from "@/components/File/FileUpload";
import React from "react";
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const { data: session } = useSession();

  console.log("dashboard page :")
  console.log(session)

  return <div>
    <h1>Home</h1>
    <FileUpload
      accessToken={session?.backendTokens?.accessToken ?? ""}
    />
  </div>;
};

export default DashboardPage;