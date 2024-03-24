"use client"

import React, {useEffect} from "react";
import { me } from "@/network/auth.network";

const DashboardPage = () => {
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
  </div>;
};

export default DashboardPage;