"use client";

import React, { useRef, useState } from "react";
import InputBox from "@/components/InputBox";
import Link from "next/link";
import * as networkAuth from "@/network/auth.network";
import { Separator } from "@/components/ui/separator";
import navigate from "@/components/navigate";
import toast from 'react-hot-toast';
import ButtonLoader from "@/components/atoms/ButtonLoader";
import useMe from "@/store/me.zustand.store";

const LoginPage = () => {
  const me = useMe();
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const login = async () => {
    setOnLoad(true);
    const res = await networkAuth.login({
      email: data.current.email,
      password: data.current.password,
    });
    setOnLoad(false);

    console.log(res)

    if (res.ok === false) {
      // todo : why toast not display ????
      console.log("show me toast")
      toast("Bad login information");
    } else {
      // update me and trigger navigate to dashboard
      me.setDataUser(res) 
    }
  };
  const data = useRef<networkAuth.ILogin>({
    email: "",
    password: "",
  });

  return (
    <section className="flex w-full justify-center items-center h-screen bg-[url('/bg/login.svg')]">
      <div className="border rounded overflow-hidden shadow max-w-md w-full bg-slate-100">
        <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
          Log in
        </div>
        <div className="p-2 flex flex-col gap-6">
          <InputBox
            name="email"
            labelText="Email"
            required
            onChange={(e) => (data.current.email = e.target.value)}
          />
          <InputBox
            name="password"
            labelText="Password"
            type="password"
            required
            onChange={(e) => (data.current.password = e.target.value)}
          />
          <div className="flex justify-center items-center gap-2">
            <ButtonLoader
              onClick={login}
              onLoad={onLoad}
            >Log In</ButtonLoader>
          </div>
          <Separator />
          <div className="flex justify-center pb-2">
            <Link className="" href={"/signup"}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;