"use client";

import InputBox from "@/components/InputBox";
import Link from "next/link";
import React, { useRef, useState } from "react";
import * as networkAuth from "@/network/auth.network";
import navigate from "@/components/navigate";
import { Separator } from "@/components/ui/separator";
import IconLoaderSpin from "@/components/CustomIcon/IconLoaderSpin";
import ButtonLoader from "@/components/atoms/ButtonLoader";

const SignupPage = () => {
  const [onLoad, setOnLoad] = useState<boolean>(false);

  const register = async () => {
    
    setOnLoad(true);
    const res = await networkAuth.register({
      email: data.current.email,
      password: data.current.password,
    })
      .then(resp => {
        navigate("/login")
      })
      .catch(err => {
      })
      .finally(() => {
        setOnLoad(false);
      })
  };
  const data = useRef<networkAuth.IRegister>({
    email: "",
    password: "",
  });

  return (
    <section className="flex w-full justify-center items-center h-screen bg-[url('/bg/register.svg')]">
      <div className="border rounded overflow-hidden shadow max-w-md w-full bg-slate-100">
        <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
          Sign up
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
            <ButtonLoader onClick={register} onLoad={onLoad}>
              Register
            </ButtonLoader>
          </div>

          <Separator />
          <div className="flex justify-center pb-2">

            <Link className="" href={"/login"}>
              Already have an account ?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;