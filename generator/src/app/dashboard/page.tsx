"use client"

import FileUpload from "@/components/File/FileUpload";
import React, {useEffect} from "react";
import { me } from "@/network/auth.network";

const DashboardPage = () => {

//  console.log("dashboard page :")
//  console.log(session)

  useEffect(() => {
    me()
    .then(resp => {
      console.log("resp ====>")
      console.log(resp)
    })
    .catch(err => {
      console.log("err : ")
      console.log(err)
    })
  }, [])
  

  return <div>
    <h1>Home</h1>
    <FileUpload
    />
  </div>;
};

export default DashboardPage;