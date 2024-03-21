"use client";
import { Button } from "@/components/Button";
import InputBox from "@/components/InputBox";
import { BACKEND_URL } from "@/lib/constants";
import Link from "next/link";
import React, { useRef } from "react";
import * as networkAuth from "@/network/auth.network";

const SignupPage = () => {
  const register = async () => {
    const res = await networkAuth.register({
      email: data.current.email,
      password: data.current.password,
    });

    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    await res.json();
  };
  const data = useRef<networkAuth.IRegister>({
    email: "",
    password: "",
  });

  return (
    <div className="m-2 border rounded overflow-hidden shadow">
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
          labelText="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;